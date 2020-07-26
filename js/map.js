
'use strict';
(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  /* var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var TYPES = ['flat', 'house', 'palace', 'bungalo'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

  var createArrayOfAdvertisements = function () {
    var advertisements = [];
    for (var i = 1; i <= 8; i++) {
      var mapPinsBlock = window.variables.mapPinsBlock;
      var location = {
        x: Math.random() * mapPinsBlock.offsetWidth,
        y: 130 + Math.random() * 500
      };
      var advertisement = {
        avatar: 'img/avatars/user0' + i + '.png',
        title: 'заголовок предложения',
        address: location.x + ', ' + location.y,
        price: 500,
        type: window.functions.getRandomElement(TYPES),
        rooms: Math.round(Math.random() * 10) + 1,
        guests: Math.round(Math.random() * 10) + 1,
        checkin: window.functions.getRandomElement(TIMES),
        checkout: window.functions.getRandomElement(TIMES),
        features: window.functions.getRandomSubarray(FEATURES),
        description: 'строка с описанием',
        photos: window.functions.getRandomSubarray(PHOTOS),
        location: location
      };
      advertisements.push(advertisement);
    } return advertisements;
  };*/
      var renderAdvertismentPins = function (advertisements) {
      var fragment = document.createDocumentFragment();
      var template = document.querySelector('#pin').content;
      for (var i = 0; i < 6; i++) {
        var newAdd = template.cloneNode(true);
        var btn = newAdd.querySelector('.map__pin');
        var img = newAdd.querySelector('img');
        btn.style.top = advertisements[i].location.y + PIN_HEIGHT + 'px';
        btn.style.left = advertisements[i].location.x + PIN_WIDTH / 2 + 'px';
        img.src = advertisements[i].author.avatar;
        img.alt = advertisements[i].offer.title;
        btn.setAttribute('data-index', i);
        fragment.appendChild(newAdd);
      }
      window.variables.mapPinsBlock.appendChild(fragment);
    };
  // переводит тип жилья
  var translateAccomodationType = function (type) {
    var newType;
    if (type === 'flat') {
      newType = 'Квартира';
    } else if (type === 'house') {
      newType = 'Дом';
    } else if (type === 'palace') {
      newType = 'Дворец';
    } else {
      newType = 'Бунгало';
    } return newType;
  };
        // создается карточка объявления
    var addAdvertismentCard = function (advertisement) {
      var photos = advertisement.offer.photos;
      var newTemplate = document.querySelector('#card').content;
      var newOffer = newTemplate.cloneNode(true);
      var authorAvatar = newOffer.querySelector('.popup__avatar');
      newOffer.querySelector('.popup__title').title = advertisement.offer.title;
      newOffer.querySelector('.popup__text--address').textContent = advertisement.offer.address;
      newOffer.querySelector('.popup__text--price').textContent = advertisement.offer.price + '₽/ночь';
      newOffer.querySelector('.popup__type').textContent = translateAccomodationType(advertisement.offer.type);
      newOffer.querySelector('.popup__text--capacity').textContent = advertisement.offer.rooms + ' ' + 'комнат(-ы) для' + ' ' + advertisement.offer.guests + ' ' + 'гостей';
      newOffer.querySelector('.popup__text--time').textContent = 'Заезд после' + ' ' + advertisement.offer.checkin + ', выезд до ' + advertisement.offer.checkout;
      newOffer.querySelector('.popup__features').textContent = advertisement.offer.features;
      newOffer.querySelector('.popup__description').textContent = advertisement.offer.description;
      newOffer.querySelector('.popup__photos img').src = advertisement.offer.photos[0];

      if (photos.length > 1) {
        var blockPhotos = newOffer.querySelector('.popup__photos');
        var fragment = document.createDocumentFragment();
        for (var i = 1; i < photos.length; i++) {
          var image = document.createElement('img');
          image.src = photos[i];
          image.classList.add('popup__photo');
          image.height = 40;
          image.width = 45;
          fragment.appendChild(image);
        }
        blockPhotos.appendChild(fragment);
      }
      authorAvatar.src = advertisement.author.avatar;
      document.querySelector('.map__card').classList.remove('hidden');
      var container = window.variables.map.querySelector('.map__filters-container');
      window.variables.map.insertBefore(newOffer, container);
    };
    var closePopUp = function () {
      document.querySelector('.map__card').remove();
      document.removeEventListener('keydown', onClosePopUpEsc);
    };
    var onClosePopUpEsc = function (evt) {
      if (evt.key === 'Escape') {
        closePopUp();
      }
    }; 
          var onPinClick = function (advertisements, evt) {
            var pin = evt.target.closest('.map__pin');
      if ((!pin) || (pin.classList.contains('map__pin--main'))) {
        return;
      }
      var j = pin.dataset.indexNumber;
      addAdvertismentCard(advertisements[j]);
      var card = document.querySelector('.map__card');
      var cardClose = document.querySelector('.popup__close');
      cardClose.addEventListener('click', function () {
        closePopUp();
      });
      document.addEventListener('keydown', onClosePopUpEsc);
  }

  var onSuccess = function (advertisements) {
    console.log(advertisements);
    renderAdvertismentPins(advertisements);
    onPinClick = onPinClick.bind(advertisements, null);
    window.variables.mapPinsBlock.addEventListener('click', onPinClick);
  };
  window.load(onSuccess);
  var mainPin = window.variables.mainPin;
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      var x = (mainPin.offsetLeft - shift.x);
      var y = (mainPin.offsetTop - shift.y);
      var mapPins = window.variables.mapPinsBlock;

      if (y > 630) {
        y = 630;
      } else if (x > mapPins.offsetWidth - 32) {
        x = mapPins.offsetWidth - 32;
      } else if (y < 130) {
        y = 130;
      } else if (x < -32) {
        x = -32;
      }

      mainPin.style.top = y + 'px';
      mainPin.style.left = x + 'px';
      document.querySelector('#address').value = (x + 32) + ', ' + (y + 80);
    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();

