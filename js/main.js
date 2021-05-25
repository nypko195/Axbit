"use strict";
//===time===
const timer = document.getElementById("only-time");

const time = setInterval(function () {
   let date = new Date();

   let a = date.getSeconds();
   let min = date.getMinutes();
   let h = date.getHours();

   let minutes = getZero(min);
   let hours = getZero(h);
   let seconds = getZero(a)
   
   timer.innerHTML = `<span>${hours}</span><span>:</span><span>${minutes}</span><span>:</span><span>${seconds}</span>`;   
   
});

function getZero(num) {
   if(num >= 0 && num < 10) {
      return `0${num}`;
   } else {
      return num;
   }
}

//===weather===
// API ключ
const apiKey = "e281f29fffa4f3555a2a074c8e3d6581";
// Город погода которого нужна
let city = "Samara";

fetch(`api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
.then((resp) => {
   console.log(resp);
})







