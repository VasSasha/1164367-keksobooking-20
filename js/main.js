'use strict';
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
  var randomNumber = Math.floor(1 + Math.random() * ((arr.length - 1) - 1));
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
      type: getRandomSubarray(TYPES),
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
// отображаются метки, заполненные данными массива
var renderAdvertisments = function () {
  var advertisments = createArrayOfAdvertisments();
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#pin').content;
  var pinWidth = 50;
  var pinHeight = 70;
  for (var i = 0; i < 8; i++) {
    var newAdd = template.cloneNode(true);
    var btn = newAdd.querySelector('.map__pin');
    var img = newAdd.querySelector('img');
    btn.style.top = advertisments[i].location.y - pinHeight + 'px';
    btn.style.left = advertisments[i].location.x - pinWidth / 2 + 'px';
    img.src = advertisments[i].avatar;
    img.alt = advertisments[i].title;
    fragment.appendChild(newAdd);
  }
  mapPins.appendChild(fragment);
};
renderAdvertisments();
var mapBlock = document.querySelector('.map');
// var mapContainer = document.querySelector('.map__filters-container');
// создается карточка объявления
var addAdvertismentCard = function () {
  var advertisments = createArrayOfAdvertisments();
  var newTemplate = document.querySelector('#card').content;
  var newOffer = newTemplate.cloneNode(true);
  newOffer.querySelector('.popup__title').title = advertisments.title;
  newOffer.querySelector('.popup__text--address').textContent = advertisments.address;
  newOffer.querySelector('.popup__text--price').textContent = advertisments.price + ' ₽/ночь';
  newOffer.querySelector('.popup__type').textContent = advertisments.type;
  newOffer.querySelector('.popup__text--capacity').textContent = advertisments.rooms + ' ' + 'комнаты для' + ' ' + advertisments.guests + ' ' + 'гостей';
  newOffer.querySelector('.popup__text--time').textContent = 'Заезд после' + ' ' + advertisments.checkin + ', выезд до' + advertisments.checkout;
  newOffer.querySelector('.popup__features').textContent = advertisments.features;
  newOffer.querySelector('.popup__description').textContent = advertisments.description;
  newOffer.querySelector('.popup__photos').src = advertisments.photos;
  var authorAvatar = document.querySelector('.popup__avatar');
  authorAvatar.removeAttribute('src');
  authorAvatar.src = advertisments.avatar;
  mapBlock.appendChild(newOffer);
};
addAdvertismentCard();
