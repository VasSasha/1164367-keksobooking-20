'use strict';
var getRandomElement = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
};
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var time = ['12:00', '13:00', '14:00'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var getArray = function (arr) {
  var randomNumber = Math.floor(1 + Math.random() * ((arr.length - 1) - 1));
  var newArr = [];
  for (var i = 0; i < randomNumber; i++) {
    newArr.push(arr[i]);
  } return newArr;
};
var advertisments = [];
var createMassive = function () {
  for (var i = 1; i <= 8; i++) {
    var location = {
      x: Math.random() * 200,
      y: 130 + Math.random() * 500
    };
    var informationForPost = {
      avatar: 'img/avatars/user0' + i + '.png',
      title: 'заголовок предложения',
      address: location.x + ', ' + location.y,
      price: 500 + 'USD',
      type: 'flat',
      rooms: 3,
      guests: 3,
      checkin: getRandomElement(time),
      checkout: getRandomElement(time),
      features: getArray(features),
      description: 'строка с описанием',
      photos: getArray(photos),
      location: location
    };
    advertisments.push(informationForPost);
  }
};
var map = document.querySelector('.map');
map.classList.remove('map--faded');
var renderAdvertisments = function () {
  createMassive();
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#pin').content;
  var pinWidth = 40;
  var pinHeight = 40;
  for (var i = 0; i < 8; i++) {
    var newAdd = template.cloneNode(true);
    var mapPins = document.querySelector('.map__pins');
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
// var mapContainer = document.querySelector('.map__filters-container');//
var renderPost = function () {
  advertisments[i].type = 'Квартира';
  var newTemplate = document.querySelector('#card').content;
  var newOffer = newTemplate.cloneNode(true);
  newOffer.querySelector('.popup__title').title = advertisments[i].title;
  newOffer.querySelector('.popup__text--address').textContent = advertisments[i].address;
  newOffer.querySelector('.popup__text--price').textContent = advertisments[i].price + ' ₽/ночь';
  newOffer.querySelector('.popup__type').textContent = advertisments[i].type;
  newOffer.querySelector('.popup__text--capacity').textContent = advertisments[i].rooms + ' ' + 'комнаты для' + ' ' + advertisments[i].guests + ' ' + 'гостей';
  newOffer.querySelector('.popup__text--time').textContent = 'Заезд после' + ' ' + advertisments[i].checkin + ', выезд до' + advertisments[i].checkout;
  newOffer.querySelector('.popup__features').textContent = advertisments[i].features;
  newOffer.querySelector('.popup__description').textContent = advertisments[i].description;
  newOffer.querySelector('.popup__photos').src = advertisments[i].photos;
  var authorAvatar = document.querySelector('.popup__avatar');
  authorAvatar.removeAttribute('src');
  authorAvatar.src = advertisments[i].avatar;
  newTemplate.appendChild(newOffer);
  mapBlock.appendChild(newTemplate);
};
renderPost();
