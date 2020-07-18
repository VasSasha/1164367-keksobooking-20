
'use strict';

(function pins() {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var renderAdvertismentPins = function () {
    var location = window.advertisement.location;
    var advertisements = window.advertisements;
    var fragment = document.createDocumentFragment();
    var template = document.querySelector('#pin').content;
    for (var i = 0; i < 8; i++) {
      var newAdd = template.cloneNode(true);
      var btn = newAdd.querySelector('.map__pin');
      var img = newAdd.querySelector('img');
      btn.style.top = advertisements[i].location.y + PIN_HEIGHT + 'px';
      btn.style.left = advertisements[i].location.x + PIN_WIDTH / 2 + 'px';
      img.src = advertisements[i].avatar;
      img.alt = advertisements[i].title;
      fragment.appendChild(newAdd);
    }
    window.util.mapPinsBlock.appendChild(fragment);
  };
  renderAdvertismentPins();
  window.pins = pins;
})();
