
'use strict';

(function data() {
  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var pins = Array.from(document.querySelectorAll('.map__pin'));
  var mainPin = document.querySelector('.map__pin--main');
  var priceInput = document.querySelector('#price');

  window.util = {
    mapPinsBlock: mapPins,
    map: map,
    mainPin: mainPin,
    pins: pins,
    priceInput: priceInput,
  };
  window.data = data;
})();
