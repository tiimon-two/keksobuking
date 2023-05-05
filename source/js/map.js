/* global L:readonly */

import {enableAddForm, formElements, mapFilterElements, address, enableElements, enableFilterForm} from './form.js';
import { makeRelative } from './relative-obj.js';

const tokyoCenter = {
  lat: 35.67,
  lng: 139.76,
}

const map = L.map('map-canvas').setView({
  lat: tokyoCenter.lat,
  lng: tokyoCenter.lng,
}, 10);

const onMapLoad = () => {
  enableAddForm();
  enableElements(formElements);
  enableElements(mapFilterElements);
  address.value = 'lat ' +  tokyoCenter.lat + ', lng ' +  tokyoCenter.lng;
  address.readOnly = true;
}

map.on('load', onMapLoad());

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon(
  {
    iconUrl: 'leaflet/img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52],
  },
);


const mainMarker = L.marker(
  {
    lat: tokyoCenter.lat,
    lng: tokyoCenter.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

mainMarker.on('moveend', (evt) => {
  address.value = 'lat ' +  evt.target.getLatLng().lat.toFixed(5) +
   ', lng ' +  evt.target.getLatLng().lng.toFixed(5);
});

const markerList = new Array();

const makePins = (items) => {

  if(items != null) {
    items.forEach((item) =>{
      const otherPinIcon = L.icon(
        {
          iconUrl: 'leaflet/img/pin.svg',
          iconSize: [40, 40],
          iconAnchor: [20, 40],
        },
      );

      const marker = L.marker(
        {
          lat: item.location.lat,
          lng: item.location.lng,
        },
        {
          otherPinIcon,
        },
      );

      markerList.push(marker);

      marker
        .addTo(map)
        .bindPopup(makeRelative(item),
          {
            keepInView: true,
          },
        );
    });
    enableFilterForm();
  }
};

const resetMarker = () => {
  mainMarker.setLatLng(L.latLng(tokyoCenter.lat, tokyoCenter.lng));
};

const deleteMarkers = () => {
  markerList.forEach(marker => {
    marker.remove();
  });
};

export {makePins, resetMarker, deleteMarkers};
