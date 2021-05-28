const modal = document.querySelector('.weather__modal'),
      inputWeatherSity = document.querySelector('.weather__item-inp'),
      btnWeather = document.querySelector('.weather__item-btn'),
      resultBd = document.querySelector('.weather__list'),
      closeResultBd = document.querySelector('.weather__result-close');

//загрузка из localStorage
function getLocal() {
   const localKey = localStorage.key(0);   
   const localValue = localStorage.getItem(localKey);

   // const checkLocalStorage = (localKey == null);

   // if(checkLocalStorage) {
   //    // hideResultWeatherCity();  
   //    return;   
   // }

   // showResultWeatherCity();
   // closeAddDisplayBlock();
   // document.querySelector('.weather__result-city').innerHTML = localKey;
   // document.querySelector('.weather__result-degree').innerHTML = `${Math.round(localValue)} C`;          
}
getLocal();


//форма 
btnWeather.addEventListener('click', sendForm)
btnWeather.addEventListener('enter', sendForm)

function sendForm(e) {
   e.preventDefault();    
   
   class InfoCity {
      constructor(sity, degree, parentSelector) {
         this.sity = sity;                  
         this.degree = degree;
         this.parent = document.querySelector(parentSelector);
      }
      render() {             
         this.parent.insertAdjacentHTML('afterbegin', `
            <div class="weather__result">
               <p class="weather__result-city">${this.sity}</p>
               <p class="weather__result-degree">${Math.round(this.degree)} C</p> 
               <span class="weather__result-close">x</span>
            </div>
         `);             
      }
   }
   
   //==Ответ с БД==                     
   let city = inputWeatherSity.value;   

   fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
   .then(resp => resp.json())     
   .then((data) => { 

      const conditionMessageError = data.cod !== 200;

      if(conditionMessageError) {
         throw new Error(data.message);
      }

      getLocal = null;    

      const sity = data.name;
      const degree = data.main.temp; 
      
      localStorage.setItem(sity, degree); 

      new InfoCity(sity, degree , '.weather__list').render();
         
      inputWeatherSity.value = '';
      removeWeatherCity()
   })
   .catch(() => {
      errorShow();
      inputWeatherSity.value = '';
      setTimeout(errorHide, 3000);
   }) 
}



   

//========================================================
//функции добавления классов(скрытие/показ результата с бд)
// function showResultWeatherCity() { 
//    resultBd.classList.remove('no-active');    
//    resultBd.classList.add('active');
// }


//удаление с локал/закрытие погоды
// closeResultBd.addEventListener('click', deleteLocalItem);

// function deleteLocalItem() {   
//    const localKey = localStorage.key(0);   
//    localStorage.removeItem(localKey);      
// }


// closeResultBd.addEventListener('click', deleteWeather);

// function deleteWeather() {   
//    hideResultWeatherCity()     
// }

// function closeAddDisplayBlock() {
//    closeResultBd.style.display = 'block';
// }




