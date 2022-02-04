import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';
import '../css/timer.css';

const refs = {
  inputSelectedDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysQuantity: document.querySelector('[data-days]'),
  hoursQuantity: document.querySelector('[data-hours]'),
  minutesQuantity: document.querySelector('[data-minutes]'),
  secondsQuantity: document.querySelector('[data-seconds]'),
  spanData: document.querySelectorAll('span'),
};

const addLeadingZero = value => String(value).padStart(2, '0');

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

let selectedDate = null;
refs.startBtn.setAttribute('disabled', true);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.removeAttribute('disabled');
      selectedDate = selectedDates[0];
    }
  },
};

const onStartTimer = () => {

};

flatpickr(refs.inputSelectedDate, options);
refs.startBtn.addEventListener('click', onStartTimer);

onStartTimer();

