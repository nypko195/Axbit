"use strict";
//===time===
const timer = document.getElementById("only-time");

const time = setInterval(function () {
   let date = new Date();

   let seconds = date.getSeconds();
   let minutes = date.getMinutes();
   let hours = date.getHours();

   
   timer.innerHTML = `<span>${hours}</span>:<span>${minutes}</span>:<span>${seconds}</span>`;   
});

//===weather===
// API ключ
let apiKey = "e281f29fffa4f3555a2a074c8e3d6581";
// Город погода которого нужна
let city = "Samara";

fetch(`http://api.openweathermap.org/data/2.5/weather?id=${city}&lang=ru&appid=${apiKey}`)
.then((resp) => {
   console.log(resp);
})







