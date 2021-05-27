const modal = document.querySelector('.weather__modal'),
      inputWeatherSity = document.querySelector('.weather__item-inp'),
      btnWeather = document.querySelector('.weather__item-btn'),
      resultBd = document.querySelector('.weather__result'),
      closeResultBd = document.querySelector('.weather__result-close');

//загрузка из localStorage
function getLocal() {
   const localKey = localStorage.key(0);   
   const localValue = localStorage.getItem(localKey);

   if(localKey == null) {
      resultHide();     
   } else {
      resultShow();
      closeResultBd.style.display = 'block';
      document.querySelector('.weather__result-city').innerHTML = localKey;
      document.querySelector('.weather__result-degree').innerHTML = `${Math.round(localValue)} C`;
   }       
}
getLocal();


//форма 
btnWeather.addEventListener('click', sendForm)
btnWeather.addEventListener('enter', sendForm)

function sendForm(e) {
   e.preventDefault();  
   
      //==Ответ с БД==                     
      let city = inputWeatherSity.value; 

      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
      .then(resp => resp.json())     
      .then((data) => { 

         if(data.cod !== 200) {
            throw new Error(data.message);
         }
         
         closeResultBd.style.display = 'block';            
         getLocal = null;            
         resultShow();         

         const sity = data.name;
         const degree = data.main.temp; 

         localStorage.setItem(sity, degree); 

         document.querySelector('.weather__result-city').innerHTML = sity;
         document.querySelector('.weather__result-degree').innerHTML = `${Math.round(degree)} C`;
         inputWeatherSity.value = '';
      })
      .catch(() => {
         errorShow();
         inputWeatherSity.value = '';
         setTimeout(errorHide, 3000);
      }) 
} 

//функции добавления классов(скрытие/показ результата с бд)
function resultShow() { 
   resultBd.classList.remove('no-active');    
   resultBd.classList.add('active');
}

function resultHide() { 
   resultBd.classList.remove('active'); 
   resultBd.classList.add('no-active');  
}

//удаление с локал/закрытие погоды
closeResultBd.addEventListener('click', deleteLocalItem);

function deleteLocalItem() {   
   const localKey = localStorage.key(0);   
   localStorage.removeItem(localKey);      
}


closeResultBd.addEventListener('click', deleteWeather);

function deleteWeather() {   
   resultHide()     
}




