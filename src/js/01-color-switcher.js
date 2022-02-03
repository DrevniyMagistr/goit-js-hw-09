const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

let timerId = null;
let off = refs.btnStop.setAttribute('disabled', true);

const onStartButton = () => {
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  toggle();
};

const onStopButton = () => {
  clearInterval(timerId);

  toggle();
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.btnStart.addEventListener('click', onStartButton);
refs.btnStop.addEventListener('click', onStopButton);

function toggle() {
  if ((off = !off)) {
    refs.btnStop.removeAttribute('disabled');
    refs.btnStart.setAttribute('disabled', true);
  } else {
    refs.btnStop.setAttribute('disabled', true);
    refs.btnStart.removeAttribute('disabled');
  }
}
