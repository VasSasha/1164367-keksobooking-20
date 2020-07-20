
'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var priceInput = document.querySelector('#price');

  window.variables = {
    mapPinsBlock: mapPins,
    map: map,
    mainPin: mainPin,
    priceInput: priceInput,
  };
})();
