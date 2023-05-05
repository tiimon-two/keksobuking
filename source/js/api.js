import { deleteMarkers, makePins} from './map.js';
import { showBadData} from './util.js';

const SIMILAR_OBJECTS_COUNT = 10;
const filterData = document.querySelector('.map__filters');
const housingType = filterData.querySelector('#housing-type');
const housingPrice = filterData.querySelector('#housing-price');
const housingRooms = filterData.querySelector('#housing-rooms');
const housingGuests = filterData.querySelector('#housing-guests');
const housingFeatures = filterData.querySelector('#housing-features');
const dishInput = housingFeatures.querySelector('#filter-dishwasher');
const parkingInput = housingFeatures.querySelector('#filter-parking');
const washerInput = housingFeatures.querySelector('#filter-washer');
const elevatorInput = housingFeatures.querySelector('#filter-elevator');
const conditionerInput = housingFeatures.querySelector('#filter-conditioner');
const wifiInput = housingFeatures.querySelector('#filter-wifi');

const compareNotices = (noticeList) => {
  const list = new Array();
  noticeList.forEach(notice => {
    let priceRange;

    if (notice.offer.price < 10000) {
      priceRange = 'low';
    } else if ((notice.offer.price >= 10000) && (notice.offer.price < 50000)) {
      priceRange = 'middle';
    } else {
      priceRange = 'high';
    }

    const compareFeatures = (featuresList) => {
      let allCompare = true;
      if (wifiInput.checked) {
        let currentStatus = false;
        featuresList.forEach(feature => {
          if (feature === 'wifi') {
            currentStatus = true;
          }
        });
        if (!currentStatus) {
          allCompare = false;
        }
      }

      if (conditionerInput.checked) {
        let currentStatus = false;
        featuresList.forEach(feature => {
          if (feature === 'conditioner') {
            currentStatus = true;
          }
        });

        if (!currentStatus) {
          allCompare = false;
        }
      }

      if (elevatorInput.checked) {
        let currentStatus = false;
        featuresList.forEach(feature => {
          if (feature === 'elevator') {
            currentStatus = true;
          }
        });

        if (!currentStatus) {
          allCompare = false;
        }
      }

      if (washerInput.checked) {
        let currentStatus = false;
        featuresList.forEach(feature => {
          if (feature === 'washer') {
            currentStatus = true;
          }
        });

        if (!currentStatus) {
          allCompare = false;
        }
      }

      if (parkingInput.checked) {
        let currentStatus = false;
        featuresList.forEach(feature => {
          if (feature === 'parking') {
            currentStatus = true;
          }
        });
        if (!currentStatus) {
          allCompare = false;
        }
      }

      if (dishInput.checked) {
        let currentStatus = false;
        featuresList.forEach(feature => {
          if (feature === 'dishwasher') {
            currentStatus = true;
          }
        });
        if (!currentStatus) {
          allCompare = false;
        }
      }

      return allCompare;
    };

    if ((notice.offer.features != null && compareFeatures(notice.offer.features) ||
      (!wifiInput.checked && !washerInput.checked &&
      !dishInput.checked && !parkingInput.checked && !elevatorInput.checked && !conditionerInput.checked))) {
      if ((housingType.value === 'any') && (housingPrice.value == 'any') &&
        (housingRooms.value === 'any') && (housingGuests.value === 'any'))  {
        list.push(notice);
      } else if (housingType.value != 'any'){
        if (housingType.value === notice.offer.type) {
          if (housingPrice.value != 'any') {
            if (housingPrice.value === priceRange) {
              if (housingRooms.value != 'any') {
                if (housingRooms.value == notice.offer.rooms) {
                  if (housingGuests.value != 'any') {
                    if (housingGuests.value == notice.offer.guests) {
                      list.push(notice);
                    }
                  } else {
                    list.push(notice);
                  }
                }
              } else {
                if (housingGuests.value != 'any') {
                  if (housingGuests.value == notice.offer.guests) {
                    list.push(notice);
                  }
                } else {
                  list.push(notice);
                }
              }
            }
          } else {
            if (housingRooms.value != 'any') {
              if (housingRooms.value == notice.offer.rooms) {
                if (housingGuests.value != 'any') {
                  if (housingGuests.value == notice.offer.guests) {
                    list.push(notice);
                  }
                } else {
                  list.push(notice);
                }
              }
            } else {
              if (housingGuests.value != 'any') {
                if (housingGuests.value == notice.offer.guests) {
                  list.push(notice);
                }
              } else {
                list.push(notice);
              }
            }
          }
        }
      }
    }

  });
  return list;
};

const getData = () => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        showBadData('Не удалось загрузить данные. Попробуйте ещё раз');
      }
    })
    .then((objects) => {
      if (compareNotices(objects).length > 10) {

        makePins(compareNotices(objects).slice(0, SIMILAR_OBJECTS_COUNT));
      } else {
        makePins(compareNotices(objects));
      }
    });
}

const setFilterChange = (cb) => {
  filterData.addEventListener('change', () => {
    deleteMarkers();
    cb();
  });
}

export {getData, setFilterChange};
