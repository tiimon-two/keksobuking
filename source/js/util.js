const ALERT_SHOW_TIME = 5000;

const createRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);

  if (max <= min) {
    return Math.floor(Math.random() * (min - max + 1) + max);
  }

  return Math.floor(Math.random() * (max - min + 1) + min);
}

const createRandomFlow = (min, max, round = 5) => {
  let randomFloat;

  if (max <= min) {
    randomFloat = (Math.random() * (min - max) + max).toString().split('.');
  } else {
    randomFloat = (Math.random() * (max - min) + min).toString().split('.');
  }

  return parseFloat(randomFloat[0] + '.' + randomFloat[1].substring(0, round));
}

const showBadData = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const alert =  document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const alertCloseButton = alert.querySelector('.error__button');

const showAlert = () => {

  document.body.append(alert);

  document.addEventListener('keydown', escKeydownHandler);

  document.addEventListener('click', clickHandler);

  alertCloseButton.addEventListener('click', alertButtonHandler);
}

const alertButtonHandler = () => {
  alert.remove();
  alertCloseButton.removeEventListener('click', alertButtonHandler);
}

const sucess = document.querySelector('#success').content.querySelector('.success').cloneNode(true);

const showSuccess = () => {
  document.body.append(sucess);

  document.addEventListener('keydown', escKeydownHandler);

  document.addEventListener('click', clickHandler);
};

const closeAlert = () => {
  sucess.remove();
  alert.remove();
  document.removeEventListener('keydown', escKeydownHandler);
  document.removeEventListener('click', clickHandler);
};

const escKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closeAlert();
  }
};

const clickHandler = (evt) => {
  evt.preventDefault();
  closeAlert();
};

const debounce = (func, timeout) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
};

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};


export {createRandomInt, createRandomFlow,showBadData, showAlert, showSuccess, debounce, isEscEvent};
