const template = document.querySelector('#card').content.querySelector('.popup');

const makeRelative = (item) => {
  const card = template.cloneNode(true);
  const cardTitle = card.querySelector('.popup__title');
  const cardAdress = card.querySelector('.popup__text--address');
  const cardPrice = card.querySelector('.popup__text--price');
  const cardType = card.querySelector('.popup__type');
  const cardCapacity = card.querySelector('.popup__text--capacity');
  const cardTime = card.querySelector('.popup__text--time');
  const cardFeaturesList = card.querySelector('.popup__features');
  const cardDescription = card.querySelector('.popup__description');
  const cardPhotoList = card.querySelector('.popup__photos');
  const cardAvatar = card.querySelector('.popup__avatar');

  cardTitle.textContent = item.offer.title;

  const loseContent = (item) => {
    if (!item.textContent) {
      item.classList.add('hidden');
    }
  }

  loseContent(cardTitle);

  cardAdress.textContent = item.offer.adress;
  cardPrice.textContent = item.offer.price;

  loseContent(cardPrice);

  const getType = (type) => {
    let houseType;
    switch (type) {
      case 'flat':
        houseType = 'Квартира';
        break;
      case 'bungalow':
        houseType =  'Бунгало';
        break;
      case 'hotel':
        houseType = 'Отель';
        break;
      case 'house':
        houseType = 'Дом';
        break;
      case 'palace':
        houseType = 'Дворец';
        break;
    }
    return houseType;
  };

  cardType.textContent = getType(item.offer.type);
  cardCapacity.textContent = item.offer.rooms + ' комнаты для ' + item.offer.guests + ' гостей';
  cardTime.textContent = 'Заезд после ' + item.offer.checkin + ', выезд до ' + item.offer.checkout;

  const templateFeaturesList = card.querySelectorAll('.popup__feature');
  const featureTemplate = card.querySelector('.popup__feature').cloneNode();
  featureTemplate.classList.remove('popup__feature--wifi');

  const getFeatures = () => {
    for (let i = 0; i < templateFeaturesList.length; i++) {
      templateFeaturesList[i].remove();
    }

    const featuresListFragment = document.createDocumentFragment();

    if (item.offer.features != null) {
      for (let i = 0; i < item.offer.features.length; i++) {
        const feature  = featureTemplate.cloneNode();
        feature.classList.add('popup__feature--' + item.offer.features[i]);
        featuresListFragment.appendChild(feature);
      }
    }

    return featuresListFragment;
  };

  cardFeaturesList.appendChild(getFeatures());

  const loseElements = (items) => {
    if (items.length === 0) {
      items.classList.add('hidden');
    }
  }

  loseElements(cardFeaturesList);

  cardDescription.textContent = item.offer.description;

  loseContent(cardDescription);

  const getPhotos = () => {
    const templatePhotoList = card.querySelectorAll('.popup__photo');
    const photoTemplate = card.querySelector('.popup__photo').cloneNode();

    for (let i = 0; i < templatePhotoList.length; i++) {
      templatePhotoList[i].remove();
    }

    const photosListFragment = document.createDocumentFragment();

    if (item.offer.photos != null) {
      for (let i = 0; i < item.offer.photos.length; i++) {
        const photo = photoTemplate.cloneNode();
        photo.src = item.offer.photos[i];
        photosListFragment.appendChild(photo);
      }
    }

    return photosListFragment;
  };

  cardPhotoList.appendChild(getPhotos());

  loseElements(cardPhotoList);

  cardAvatar.src = item.author.avatar;

  return card;
}

export {makeRelative};

