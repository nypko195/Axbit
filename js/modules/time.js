//время
setInterval(() => {
   const timer = document.getElementById('only-time');
   let date = new Date();

   let s = date.getSeconds();
   let min = date.getMinutes();
   let h = date.getHours();

   let minutes = getZero(min);
   let hours = getZero(h);
   let seconds = getZero(s)

   let data = `<span>${hours}</span><span>:</span><span>${minutes}</span><span>:</span><span>${seconds}</span>`;

   timer.innerHTML = data; 

},0);

//добавление нуля

function getZero(num) {
   const isOneDigitNumber = (num >= 0 && num < 10);

   if(isOneDigitNumber) {
      return `0${num}`;
      } else {
         return num;
   }
}


