const modal = document.querySelector('.weather__modal'),
      inputWeatherSity = document.querySelector('.weather__item-inp'),
      btnWeather = document.querySelector('.weather__item-btn'),
      resultBd = document.querySelector('.weather__list'),
      closeResultBd = document.querySelector('.weather__result-close');      

//загрузка из localStorage
function getLocal() {
   for (let i = 0; i < localStorage.length; i++) {
      let key = localStorage.key(i);
      let value = localStorage.getItem(key);      
      showLocalWeatherCity(key, value);
   }

   function showLocalWeatherCity(key, value) {
      resultBd.insertAdjacentHTML('afterbegin', `
      <div class="weather__result">
         <p class="weather__result-city">${key}</p>
         <p class="weather__result-degree">${Math.round(value)} C</p> 
         <span class="weather__result-close">x</span>
      </div>
      `);      
   } 
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
      renderNewWeatherCity() {
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

         if (conditionMessageError) {
            throw new Error(data.message);
         }

         getLocal = null;

         const sity = data.name;
         const degree = data.main.temp;

         // localStorage.setItem(sity, degree);

         new InfoCity(sity, degree, '.weather__list').renderNewWeatherCity();         
         removeWeatherCity();

         inputWeatherSity.value = '';
      })
      .catch(() => {
         errorShow();
         inputWeatherSity.value = '';
         setTimeout(errorHide, 3000);
      })
}


function removeWeatherCity() {
   const selectedWeather = document.querySelectorAll('.weather__result');      
   selectedWeather.forEach(item => {
      item.addEventListener('click', e => {         
         if(e.target == item)
         console.log(item);
         item.remove();   
      });
   })
}




