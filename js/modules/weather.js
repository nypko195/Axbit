//===weather===
//==local==
const modal = document.querySelector('.weather__modal'),
input = document.querySelector('.weather__item-inp'),
showWeather = document.querySelector('.weather__item-btn'),
result = document.querySelector('.weather__result'),
close = document.querySelector('.weather__result-close');


function getLocal() {
   const localKey = localStorage.key(0);
   const localValue = localStorage.getItem(localKey);
   if(localKey == null) {
      result.style.display =  'none';     
   } else {
      result.style.display =  'flex';
      document.querySelector('.weather__result-city').innerHTML = localKey;
      document.querySelector('.weather__result-degree').innerHTML = `${Math.round(localValue)} C`;
   }       
}
getLocal();
localStorage.clear();

   close.addEventListener('click', e => {
      if(e.target === close) {
         result.style.display =  'none';               
      }
   })
   
   function error() {
      const text = document.querySelector('.weather__error');
      text.style.display = 'block';      
   }

   
   showWeather.addEventListener('click', e => {
      e.preventDefault();                
      if(e.target === showWeather ) {         
         result.style.display =  'flex';     
         close.style.display = 'block';            
         getLocal = null;      
         }   
      
      setTimeout(() => {
         input.value = '';
      },100) 

      //==Ответ с БД==
      const apiKey = "e281f29fffa4f3555a2a074c8e3d6581";               
      let city = input.value; 


      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
      .then(resp => resp.json())     
      .then((data) => { 
         //console.log(data);     
      const sity = data.name;
      const degree = data.main.temp;   
      localStorage.setItem(sity, degree);   
      document.querySelector('.weather__result-city').innerHTML = sity;
      document.querySelector('.weather__result-degree').innerHTML = `${Math.round(degree)} C`
      })
      .catch(() => {
         error();
      })   
   });