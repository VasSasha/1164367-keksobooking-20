
'use strict';
(function () {
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var TYPES = ['flat', 'house', 'palace', 'bungalo'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;

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
  };
  var advertisements = createArrayOfAdvertisements();

  var renderAdvertismentPins = function () {
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
    window.variables.mapPinsBlock.appendChild(fragment);
  };
  renderAdvertismentPins();
  var pins = Array.from(document.querySelectorAll('.map__pin'));
  var setPinAttribute = function () {
    for (var i = 1; i < pins.length; i++) {
      pins[i].setAttribute('data-index-number', i - 1);
    }
  };
  setPinAttribute();

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
  var addAdvertismentCard = function (offer) {
    var photos = offer.photos;
    var newTemplate = document.querySelector('#card').content;
    var newOffer = newTemplate.cloneNode(true);
    var authorAvatar = newOffer.querySelector('.popup__avatar');
    newOffer.querySelector('.popup__title').title = offer.title;
    newOffer.querySelector('.popup__text--address').textContent = offer.address;
    newOffer.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
    newOffer.querySelector('.popup__type').textContent = translateAccomodationType(offer.type);
    newOffer.querySelector('.popup__text--capacity').textContent = offer.rooms + ' ' + 'комнат(-ы) для' + ' ' + offer.guests + ' ' + 'гостей';
    newOffer.querySelector('.popup__text--time').textContent = 'Заезд после' + ' ' + offer.checkin + ', выезд до ' + offer.checkout;
    newOffer.querySelector('.popup__features').textContent = offer.features;
    newOffer.querySelector('.popup__description').textContent = offer.description;
    newOffer.querySelector('.popup__photos img').src = offer.photos[0];

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

    authorAvatar.src = offer.avatar;
    var container = window.variables.map.querySelector('.map__filters-container');
    window.variables.map.insertBefore(newOffer, container);
  };
  window.addAdvertismentCard = addAdvertismentCard;
  var closePopUp = function () {
    document.querySelector('.map__card').classList.add('hidden');
    document.querySelector('.map__card').remove();
    document.removeEventListener('keydown', onClosePopUpEsc);
  };
  var onClosePopUpEsc = function (evt) {
    if (evt.key === 'Escape') {
      closePopUp();
    }
  };
  var onPinClick = function (evt) {
    var pin = evt.target.closest('.map__pin');
    if ((!pin) || (pin.classList.contains('map__pin--main'))) {
      return;
    }
    var j = pin.dataset.indexNumber;
    addAdvertismentCard(advertisements[j]);
    var card = document.querySelector('.map__card');
    card.classList.remove('hidden');
    var cardClose = document.querySelector('.popup__close');
    cardClose.addEventListener('click', function () {
      closePopUp();
    });
    document.addEventListener('keydown', onClosePopUpEsc);
  };
  window.variables.mapPinsBlock.addEventListener('click', onPinClick);
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

      var startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';

    };
    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      var xPosition = upEvt.clientX;
      var yPosition = upEvt.clientY;
      window.functions.getMainPinCoords(xPosition, yPosition, 40, 44);
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  
  })
})();
