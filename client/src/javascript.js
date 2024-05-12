const resDiv = document.querySelector('#output');
const resBtn = document.querySelector('#getData');
const resCounter = document.querySelector('#counterValue');

let counter=1; 
 
resBtn.addEventListener('click', () => {
  counter++;
  newQuote();

});
 
window.onload = () => {
  newQuote();
};
 
function newQuote() {
  resCounter.innerHTML = `ADVICE #${counter}`;
  fetch('https://api.adviceslip.com/advice/'+counter).then(response => {
    return response.json();
  }).then(adviceData => {
    const Adviceobj = adviceData.slip;
    resDiv.innerHTML = `<p>"${Adviceobj.advice}"</p>`;
  }).catch(error => {
    console.log(error);
  });
  
}