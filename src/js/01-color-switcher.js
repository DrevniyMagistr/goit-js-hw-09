const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let timerId = null;
let toggle = refs.stopBtn.setAttribute('disabled', true);

const toggleAction = () => {
  if ((toggle = !toggle)) {
    refs.stopBtn.removeAttribute('disabled');
    refs.startBtn.setAttribute('disabled', true);
  } else {
    refs.stopBtn.setAttribute('disabled', true);
    refs.startBtn.removeAttribute('disabled');
  }
};

const onStartButton = () => {
  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  toggleAction();
};

const onStopButton = () => {
  clearInterval(timerId);

  toggleAction();
};

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.startBtn.addEventListener('click', onStartButton);
refs.stopBtn.addEventListener('click', onStopButton);
