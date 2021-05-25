window.addEventListener('DOMContentLoaded', () => { 
//===timer===
const time = setInterval(function () {
   const timer = document.getElementById("only-time");
   let date = new Date();

   let s = date.getSeconds();
   let min = date.getMinutes();
   let h = date.getHours();

   let minutes = getZero(min);
   let hours = getZero(h);
   let seconds = getZero(s)

   let data = `<span>${hours}</span><span>:</span><span>${minutes}</span><span>:</span><span>${seconds}</span>`;
   
   timer.innerHTML = data; 
   
}, 0);

function getZero(num) {
   if(num >= 0 && num < 10) {
      return `0${num}`;
   } else {
      return num;
   }
}

//===weather===
const inputValue = document.querySelector('.weather__item-inp'),
showWeather = document.querySelector('.weather__item-btn'),
result = document.querySelector('.weather__result');

showWeather.addEventListener('click', (e) => {      
   value = inputValue.value;
   console.log(value);
   if(e.target === showWeather) {
      showWeather.classList.toggle('active')
         if(showWeather.classList.contains('active')) {            
               result.style.display =  'flex';
            } else {
               result.style.display = 'none';
               inputValue.value = '';
            }
} 

//===Ответ с БД===

   const apiKey = "6a27e4d2146bc3659597ed61da656145";2        
   let city = value; 

   fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`)
   .then((resp) => {
   return resp.json();
   })
   .then((data) => {      
   const sity = data.name;
   const degree = data.main.temp;

   document.querySelector('.weather__result-city').innerHTML = sity;
   document.querySelector('.weather__result-degree').innerHTML = degree;
   });

});

});






