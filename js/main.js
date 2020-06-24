'use strict';

var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TIMES = ['12:00', '13:00', '14:00'];
var TYPES = ['flat', 'house', 'palace', 'bungalo'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

//  возвращается случайны элемент из массива
var getRandomElement = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

// возвращается массив случайной длины из полученного массива
var getRandomSubarray = function (arr) {
  var randomNumber = Math.round(1 + Math.random() * (arr.length - 1));
  var newArr = [];
  for (var i = 0; i < randomNumber; i++) {
    newArr.push(arr[i]);
  } return newArr;
};

var mapPins = document.querySelector('.map__pins');

// генирируются данные для отображения
var createArrayOfAdvertisments = function () {
  var advertisments = [];
  for (var i = 1; i <= 8; i++) {
    var location = {
      x: Math.random() * mapPins.offsetWidth,
      y: 130 + Math.random() * 500
    };
    var advertisment = {
      avatar: 'img/avatars/user0' + i + '.png',
      title: 'заголовок предложения',
      address: location.x + ', ' + location.y,
      price: 500,

      type: getRandomElement(TYPES),
      rooms: Math.round(Math.random() * 10) + 1,
      guests: Math.round(Math.random() * 10) + 1,
      checkin: getRandomElement(TIMES),
      checkout: getRandomElement(TIMES),
      features: getRandomSubarray(FEATURES),
      description: 'строка с описанием',
      photos: getRandomSubarray(PHOTOS),
      location: location
    };
    advertisments.push(advertisment);
  } return advertisments;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

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

var advertisments = createArrayOfAdvertisments();
var btn = document.querySelector('.map__pin');

// отображаются метки, заполненные данными массива
var renderAdvertisments = function () {
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#pin').content;
  for (var i = 0; i < 8; i++) {
    var newAdd = template.cloneNode(true);
    var img = newAdd.querySelector('img');
    btn.style.top = advertisments[i].location.y - PIN_HEIGHT + 'px';
    btn.style.left = advertisments[i].location.x - PIN_WIDTH / 2 + 'px';
    img.src = advertisments[i].avatar;
    img.alt = advertisments[i].title;
    fragment.appendChild(newAdd);
  }
  mapPins.appendChild(fragment);
};

renderAdvertisments();

// создается карточка объявления
/* var addAdvertismentCard = function (offer) {
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
  var mapBlock = document.querySelector('.map');
  authorAvatar.src = offer.avatar;
  var container = mapBlock.querySelector('.map__filters-container');
  mapBlock.insertBefore(newOffer, container);
};
addAdvertismentCard(advertisments[0]);*/

var mapFilters = document.querySelectorAll('.map__filters fieldset');
var adForm = document.querySelector('.ad-form');
var mapPin = document.querySelector('.map__pin--main');
var guestsSelected = document.querySelector('#housing-guests option');
var roomsSelected = document.querySelector('#housing-rooms option');
var getFormsBlocked = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].setAttribute('disabled', true);
  }
};
var getFormsUnblocked = function (arr) {
  for (var i = 0; i < arr.length; i++) {
    arr[i].removeAttribute('disabled');
  }
};
// неактивное состояние страницы
var renderNonActiveCondition = function () {
  getFormsBlocked(adForm);
  getFormsBlocked(mapFilters);
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  mapPin.style.top = location.y - PIN_WIDTH / 2 + 'px';
  mapPin.style.left = location.x - PIN_WIDTH / 2 + 'px';
};

renderNonActiveCondition();
// активное состояние страницы
var renderActiveCondition = function () {
  getFormsUnblocked(adForm);
  getFormsUnblocked(mapFilters);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
};

var onPinClick = function (evt) {
  if (evt.button === 0) {
    renderActiveCondition();
  }
};

mapPin.addEventListener('mousedown', onPinClick);
var onEnterPress = function (evt) {
  if ((mapPin === document.activeElement) && (evt.key === 'Enter')) {
    renderActiveCondition();
  }
};

mapPin.addEventListener('keydown', onEnterPress);

// валидация форм
var getValidForm = function () {
  if (roomsSelected.value < guestsSelected.value) {
    document.querySelector('#housing-guests').setCustomValidity('Количество гостей не должно превышать количество комнат.');
    document.querySelector('#housing-guests').reportValidity();
  } else {
     document.querySelector('#housing-guests').setCustomValidity('');
  }
};
getValidForm();


