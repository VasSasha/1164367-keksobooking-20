'use strict';
var getRandomElement = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
};
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var time = ['12:00', '13:00', '14:00'];
var type = ['flat', 'house', 'palace', 'bungalo'];
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
      x: Math.floor(Math.random() * offsetWidth()),
      y: 130 + Math.random() * 500
    };
    var informationForPost = {
      avatar: 'img/avatars/user0' + i + '.png',
      title: 'заголовок предложения',
      address: location.x + ', ' + location.y,
      price: 500,
      type: getArray(type),
      rooms: Math.round(Math.random() * 10) + 1,
      guests: Math.round(Math.random() * 10) + 1,
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
    btn.style.left = advertisments[i].location.x - pinWidth + 'px';
    img.src = advertisments[i].avatar;
    img.alt = advertisments[i].title;
    fragment.appendChild(newAdd);
  }
   mapPins.appendChild(fragment);
};
renderAdvertisments();

 