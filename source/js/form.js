import { resetMarker } from './map.js';
import { showAlert, showSuccess } from './util.js';

const houseType = document.querySelector('#type');
const housePrice = document.querySelector('#price');

const changePrice = () => {
  switch (houseType.value) {
    case 'bungalow':
      housePrice.placeholder = 0;
      housePrice.min = 0;
      break;
    case 'flat':
      housePrice.placeholder = 1000;
      housePrice.min = 1000;
      break;
    case 'hotel':
      housePrice.placeholder = 3000;
      housePrice.min = 3000;
      break;
    case 'house':
      housePrice.placeholder = 5000;
      housePrice.min = 5000;
      break;
    case 'palace':
      housePrice.placeholder = 10000;
      housePrice.min = 10000;
      break;
  }
};

changePrice();

houseType.addEventListener ('change', () => {
  changePrice();
});

const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');

timeIn.addEventListener('change', () => {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', () => {
  timeIn.value = timeOut.value;
});

const addForm = document.querySelector('.ad-form');
addForm.classList.add('ad-form--disabled');
const formElements = addForm.children;

const disableElements = (elements) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = true;
  }
};

const enableElements = (elements) => {
  for (let i = 0; i < elements.length; i++) {
    elements[i].disabled = false;
  }
};

disableElements(formElements);

const mapFilterForm = document.querySelector('.map__filters');
mapFilterForm.classList.add('map__filters--disabled');
const mapFilterElements = mapFilterForm.children;

disableElements(mapFilterElements);

const address = document.querySelector('#address');

const title = document.querySelector('#title');

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

title.addEventListener('input', () => {
  const titleLength = title.value.length;
  if (titleLength < MIN_TITLE_LENGTH) {
    title.setCustomValidity('Минимальная длина заголовка - 30 символов.');
  } else if (titleLength > MAX_TITLE_LENGTH) {
    title.setCustomValidity('Максимальная длина заголовка - 100 символов.');
  } else {
    title.setCustomValidity('');
  }

  title.reportValidity();
});

housePrice.addEventListener('input', () => {
  if (housePrice.value > 1000000) {
    housePrice.setCustomValidity('Максимальная цена за ночь - 1 000 000');
  } else housePrice.setCustomValidity('');

  housePrice.reportValidity();
});

const roomNumber = document.querySelector('#room_number');
const capacity = document.querySelector('#capacity');

const changeCapacity = () => {
  for (let i = 0; i < capacity.length; i++) {

    if ((roomNumber.value == 1 && capacity.value > 1) || (roomNumber.value == 1 && capacity.value == 0)) {
      capacity.setCustomValidity('Число гостей должно быть 1');
    } else if ((roomNumber.value == 2 && capacity.value > 2) || (roomNumber.value == 2 && capacity.value == 0)) {
      capacity.setCustomValidity('Число гостей должно быть 1 или 2');
    } else if (roomNumber.value == 3 && capacity.value == 0) {
      capacity.setCustomValidity('Число гостей должно быть 1, 2 или 3');
    } else if (roomNumber.value == 100 && capacity.value != 0) {
      capacity.setCustomValidity('Не для гостей');
    } else {
      capacity.setCustomValidity('');
    }
  }

  capacity.reportValidity();
};

capacity.addEventListener('change', changeCapacity);

changeCapacity();

roomNumber.addEventListener('change', changeCapacity);

const resetForm = () => {
  addForm.reset();
  mapFilterForm.reset();
  resetMarker();
  showSuccess();
}

addForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const formData = new FormData(evt.target);

  fetch(
    'https://23.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    },
  ).then((response) => {
    if(response.ok) {
      resetForm();
    } else {
      showAlert();
    }
  }).catch(() => {
    showAlert();
  });
});

const resetHandler = (evt) => {
  evt.preventDefault();
  resetForm();
};

const enableAddForm = () => {
  addForm.classList.remove('ad-form--disabled');
};

const enableFilterForm = () => {
  mapFilterForm.classList.remove('map__filters--disabled');
};

const resetButton = addForm.querySelector('.ad-form__reset');
resetButton.addEventListener('click', resetHandler);

export {enableAddForm, enableFilterForm, formElements, mapFilterElements, address, enableElements};

