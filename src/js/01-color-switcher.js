const butStartEl = document.querySelector('[data-start]');
const butStopEl = document.querySelector('[data-stop]');

butStartEl.addEventListener('click', onButStartClick);
butStopEl.addEventListener('click', onButStopClick);

let timerId = null;

function onButStartClick(event) {         
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    event.target.setAttribute('disabled', true); 
    butStopEl.removeAttribute('disabled');    
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onButStopClick(event) {
    event.target.setAttribute('disabled', true);
    butStartEl.removeAttribute('disabled');
    clearInterval(timerId);
}