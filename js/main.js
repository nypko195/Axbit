window.addEventListener('DOMContentLoaded', () => {
   const weatherBtn = document.getElementById('weather-btn');   

   weatherBtn.addEventListener('click', e => {
      if(e.target == weatherBtn) {
         const a = localStorage.getItem('key', 'value');
         console.log(a);

      }
   });

});






