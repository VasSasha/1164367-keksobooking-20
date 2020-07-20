
'use strict';
(function cardsArray() {
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
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
      window.advertisement = {
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
      advertisements.push(window.advertisement);
    } return advertisements;
  };
  window.advertisements = createArrayOfAdvertisements();
  window.cardsArray = cardsArray;

  // создается карточка объявления
  var addAdvertismentCard = function (offer) {
    var photos = offer.photos;
    var newTemplate = document.querySelector('#card').content;
    var newOffer = newTemplate.cloneNode(true);
    var authorAvatar = newOffer.querySelector('.popup__avatar');
    newOffer.querySelector('.popup__title').title = offer.title;
    newOffer.querySelector('.popup__text--address').textContent = offer.address;
    newOffer.querySelector('.popup__text--price').textContent = offer.price + '₽/ночь';
    newOffer.querySelector('.popup__type').textContent = window.functions.translateAccomodationType(offer.type);
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

  var onPinClick = function (evt) {
    var pin = evt.target.closest('.map__pin');
    if ((!pin) || (pin.classList.contains('map__pin--main'))) {
      return;
    }
    var j = pin.dataset.indexNumber;
    window.addAdvertismentCard(window.advertisements[j]);
    var card = document.querySelector('.map__card');
    card.classList.remove('hidden');
    var cardClose = document.querySelector('.popup__close');
    cardClose.addEventListener('click', function () {
      window.functions.closePopUp();
    });
    document.addEventListener('keydown', window.functions.onClosePopUpEsc);
  };
  window.variables.mapPinsBlock.addEventListener('click', onPinClick);
})();
