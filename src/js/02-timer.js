import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let timerId = null;
let startTimerBtn = null;

startTimerBtn = document.querySelector('.start');
timerFieldDays = document.querySelector('[data-days]');
timerFielHours = document.querySelector('[data-hours]');
timerFieldMinutes = document.querySelector('[data-minutes]');
timerFieldSeconds = document.querySelector('[data-seconds]');

startTimerBtn.setAttribute('disabled', true);



const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      const currentDate = new Date();
    
    if (selectedDates[0] - currentDate > 0) {
      startTimerBtn.removeAttribute('disabled');
    } else {    
        alert('Please choose a date in the future');
      }     
      },
};

const flatPickr = flatpickr('#datetime-picker', options);


function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

startTimerBtn.addEventListener('click', onTimerStart);

function onTimerStart() {
  const selectedDate = flatPickr.selectedDates[0];

  timerId = setInterval(() => {
    const intervalTime = selectedDate - new Date();
      startTimerBtn.disabled = true;

      if (intervalTime < 0) {
      clearInterval(timerId);
      return;
    }
    updateTimer(convertMs(intervalTime));
  }, 1000);
}

function updateTimer({ days, hours, minutes, seconds }) {
  timerFieldDays.textContent = days;
  timerFielHours.textContent = hours;
  timerFieldMinutes.textContent = minutes;
  timerFieldSeconds.textContent = seconds;
}




