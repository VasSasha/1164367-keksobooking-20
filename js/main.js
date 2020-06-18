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
// отображаются метки, заполненные данными массива
var renderAdvertisments = function () {
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
// создается карточка объявления
var addAdvertismentCard = function (advertisments[i]) {
  var photos = advertisments[i].photos;
  var newTemplate = document.querySelector('#card').content;
  var newOffer = newTemplate.cloneNode(true);
  var authorAvatar = newOffer.querySelector('.popup__avatar');
  newOffer.querySelector('.popup__title').title = advertisments[i].title;
  newOffer.querySelector('.popup__text--address').textContent = advertisments[i].address;
  newOffer.querySelector('.popup__text--price').textContent = advertisments[i].price + '₽/ночь';
  newOffer.querySelector('.popup__type').textContent = translateAccomodationType(advertisments[i].type);
  newOffer.querySelector('.popup__text--capacity').textContent = advertisments[i].rooms + ' ' + 'комнат(-ы) для' + ' ' + advertisments[i].guests + ' ' + 'гостей';
  newOffer.querySelector('.popup__text--time').textContent = 'Заезд после' + ' ' + advertisments[i].checkin + ', выезд до ' + advertisments[i].checkout;
  newOffer.querySelector('.popup__features').textContent = advertisments[i].features;
  newOffer.querySelector('.popup__description').textContent = advertisments[i].description;
  newOffer.querySelector('.popup__photos img').src = advertisments[i].photos[i];
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
  authorAvatar.src = advertisments[i].avatar;
  mapBlock.appendChild(newOffer);
};
addAdvertismentCard(advertisments[0]);
