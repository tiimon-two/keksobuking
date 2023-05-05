import {createRandomInt, createRandomFlow} from './util.js';

const OFFER_TITLE = ['Сдаю выгодно', 'Сдаю посуточно', 'Сдаю на длительный срок'];
const FLAT_MAX_PRICE = 1000000;
const FLAT_MIN_PRICE = 1000;
const FLAT_TYPE = ['palace', 'flat', 'house', 'bungalow'];
const ROOMS_MAX_COUNT = 10;
const GUESTS_MAX_COUNT = 20;
const CHECKIN = ['12:00', '13:00', '14:00'];
const CHECKOUT = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const DESCRIPTIONS = ['100 метров до моря', 'Дёшево и сердито', 'Рядом продают вино'];
const PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
let AVATARS = ['01', '02', '03', '04', '05', '06' , '07', '08', '09' , '10'];

const createObject = () => {
  const coordX = createRandomFlow(35.65000, 35.70000);
  const coordY = createRandomFlow(139.70000, 139.80000);
  let featuresList = new Array();

  const addAvatar = () => {
    let avatarNumber;
    if (AVATARS.length === 1) {
      avatarNumber = AVATARS[0];
    } else {
      avatarNumber = AVATARS[createRandomInt(0, AVATARS.length -1)];
    }

    let avatarUrl = 'img/avatars/user' + avatarNumber + '.png';

    if (avatarNumber > 8) {
      avatarUrl = 'img/avatars/default.png';
    }

    for(let i = 0; i < AVATARS.length; i++) {
      if (AVATARS[i] === avatarNumber) {
        AVATARS.splice(i, 1);
      }
    }

    return avatarUrl;
  }

  const addFeatures = () => {
    let currentFeature = FEATURES.slice();
    for (let i = 0; i < createRandomInt(1, FEATURES.length); i++) {
      let feature;
      if (currentFeature.length === 1) {
        feature = currentFeature[0];
      } else {
        feature = currentFeature[createRandomInt(0, currentFeature.length - 1)];
      }

      if (!featuresList.includes(feature)) {
        featuresList.push(feature);
        currentFeature.splice(i, 1);
      }
    }
    return featuresList;
  }

  const addPhotos = () => {
    let photoList = [];
    for (let i = 0; i < createRandomInt(1, PHOTOS.length); i++) {
      let photo = PHOTOS[createRandomInt(0, PHOTOS.length - 1)];
      if (!photoList.includes(photo)) {
        photoList.push(photo);
      }
    }
    return photoList;
  }

  return {
    author : {
      avatar : addAvatar(),
    },
    offer : {
      title : OFFER_TITLE[createRandomInt(0, OFFER_TITLE.length - 1)],
      adress : coordX + ', ' + coordY,
      price : createRandomInt(FLAT_MIN_PRICE, FLAT_MAX_PRICE),
      type: FLAT_TYPE[createRandomInt(0, FLAT_TYPE.length - 1)],
      rooms : createRandomInt(1, ROOMS_MAX_COUNT),
      guests : createRandomInt(1, GUESTS_MAX_COUNT),
      checkin : CHECKIN[createRandomInt(0, CHECKIN.length - 1)],
      checkout : CHECKOUT[createRandomInt(0, CHECKOUT.length - 1)],
      features : addFeatures(),
      description : DESCRIPTIONS[createRandomInt(0, DESCRIPTIONS.length -1)],
      photos : addPhotos(),
    },
    location : {
      x : coordX,
      y : coordY,
    },
  };
};

export {createObject};
