import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';
import { convertMs } from './convert-functions';
import '../css/timer.css';

const refs = {
  inputSelectedDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysQuantity: document.querySelector('[data-days]'),
  hoursQuantity: document.querySelector('[data-hours]'),
  minutesQuantity: document.querySelector('[data-minutes]'),
  secondsQuantity: document.querySelector('[data-seconds]'),
};
refs.startBtn.setAttribute('disabled', true);

let selectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDates[0] < new Date()
      ? Notify.failure('Please choose a date in the future')
      : refs.startBtn.removeAttribute('disabled'),
      (selectedDate = selectedDates[0]);
  },
};

const onStartTimer = () => {
  const timerId = setInterval(() => {
    const currentDate = Date.now();

    const deltaTime = selectedDate - currentDate;
    const deltaMs = convertMs(deltaTime);

    refs.daysQuantity.textContent = deltaMs.days;
    refs.hoursQuantity.textContent = deltaMs.hours;
    refs.minutesQuantity.textContent = deltaMs.minutes;
    refs.secondsQuantity.textContent = deltaMs.seconds;

    refs.inputSelectedDate.setAttribute('disabled', true);
    refs.startBtn.setAttribute('disabled', true);

    if (deltaTime <= 1000) {
      refs.inputSelectedDate.removeAttribute('disabled');
      clearInterval(timerId);
    }
  }, 1000);
};

flatpickr(refs.inputSelectedDate, options);
refs.startBtn.addEventListener('click', onStartTimer);
