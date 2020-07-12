

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

// отображаются метки, заполненные данными массива
var renderAdvertisments = function () {
  var fragment = document.createDocumentFragment();
  var template = document.querySelector('#pin').content;
  for (var i = 0; i < 8; i++) {
    var newAdd = template.cloneNode(true);
    var btn = newAdd.querySelector('.map__pin');
    var img = newAdd.querySelector('img');
    btn.style.top = advertisments[i].location.y + PIN_HEIGHT + 'px';
    btn.style.left = advertisments[i].location.x + PIN_WIDTH / 2 + 'px';
    img.src = advertisments[i].avatar;
    img.alt = advertisments[i].title;
    fragment.appendChild(newAdd);
  }
  mapPins.appendChild(fragment);
};
renderAdvertisments();
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
  var mapBlock = document.querySelector('.map');
  authorAvatar.src = offer.avatar;
  var container = mapBlock.querySelector('.map__filters-container');
  mapBlock.insertBefore(newOffer, container);
};

var mapFilters = document.querySelectorAll('.map__filters fieldset');
var adForms = document.querySelectorAll('.ad-form fieldset');
var adForm = document.querySelector('.ad-form');
var mapPinMain = document.querySelector('.map__pin--main');
var guestsSelected = document.querySelector('#capacity');
var roomsSelected = document.querySelector('#room_number');

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
  getFormsBlocked(adForms);
  getFormsBlocked(mapFilters);
  map.classList.add('map--faded');
  adForm.classList.add('ad-form--disabled');
  var mapPinX = parseInt(mapPinMain.style.left, 10) + 33;
  var mapPinY = parseInt(mapPinMain.style.top, 10) + 33;
  document.querySelector('#address').value = mapPinX + ', ' + mapPinY;
};


renderNonActiveCondition();
// активное состояние страницы
var renderActiveCondition = function () {
  getFormsUnblocked(adForms);
  getFormsUnblocked(mapFilters);
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  var addressInput = document.querySelector('#address');
  addressInput.setAttribute('disabled', true);

};

var onMainPinClick = function (evt) {
  if (evt.button === 0) {
    renderActiveCondition();
  }
};

// отображается адрес метки в окне ввода
var onPlaceChange = function () {
  var mapPinX = parseInt(mapPinMain.style.left, 10) + 33;
  var mapPinY = parseInt(mapPinMain.style.top, 10) + 65 + 17;
  document.querySelector('#address').value = mapPinX + ', ' + mapPinY;
};

mapPinMain.addEventListener('mousedown', onPlaceChange);
mapPinMain.addEventListener('mousedown', onMainPinClick);

var onEnterPress = function (evt) {
  if ((mapPinMain === document.activeElement) && (evt.key === 'Enter')) {
    renderActiveCondition();
  }
};

mapPinMain.addEventListener('keydown', onEnterPress);
// валидация форм
// поле количества комнат и гостей
var onFormUse = function () {
  if ((parseInt(roomsSelected.value, 10) !== 100) && (parseInt(guestsSelected.value, 10) === 0)) {
    document.querySelector('#capacity').setCustomValidity('Единственный вариант не для гостей - "100 комнат"');
    document.querySelector('#capacity').reportValidity();
  } else if ((parseInt(roomsSelected.value, 10) === 100) && (parseInt(guestsSelected.value, 10) !== 0)) {
    document.querySelector('#capacity').setCustomValidity('Данное количество комнат не предназначено для гостей');
    document.querySelector('#capacity').reportValidity();
  } else if (parseInt(roomsSelected.value, 10) < parseInt(guestsSelected.value, 10)) {
    document.querySelector('#capacity').setCustomValidity('Количество гостей не должно превышать количество комнат.');
    document.querySelector('#capacity').reportValidity();
  } else {
    document.querySelector('#capacity').setCustomValidity('');
  }
};
document.querySelector('#capacity').addEventListener('change', onFormUse);
// поле заголовка объявления
document.querySelector('#title').setAttribute('required', true);
var onTitleClick = function () {
  if (document.querySelector('#title').validity.tooShort) {
    document.querySelector('#title').setCustomValidity('Минимальное количество символов: 30');
    document.querySelector('#title').reportValidity();
  } else if (document.querySelector('#title').validity.tooLong) {
    document.querySelector('#title').setCustomValidity('Максимальное количество символов: 100');
    document.querySelector('#title').reportValidity();
  } else {
    document.querySelector('#title').setCustomValidity('');
  }
};
document.querySelector('#title').addEventListener('input', onTitleClick);
// поле цены за ночь
var priceInput = document.querySelector('#price');
priceInput.setAttribute('required', true);
var maxValue = 1000000;
if (priceInput.value > maxValue) {
  priceInput.setCustomValidity('Максимальная доступная цена - 1000000');
  priceInput.reportValidity();
}

// влияние типа жилья на цену
var typeOfAccomodation = document.querySelector('#type');
var onTypeInputClick = function () {
  if (typeOfAccomodation.value === 'bungalo') {
    priceInput.placeholder = '0';
  } else if ((typeOfAccomodation.value === 'flat') && (priceInput.value < 1000)) {
    priceInput.setCustomValidity('Минимальная цена за ночь:1000');
    priceInput.reportValidity();
    priceInput.placeholder = '1000';
  } else if ((typeOfAccomodation.value === 'house') && (priceInput.value < 5000)) {
    priceInput.setCustomValidity('Минимальная цена за ночь:5000');
    priceInput.reportValidity();
    priceInput.placeholder = '5000';
  } else if (priceInput.value < 10000) {
    priceInput.setCustomValidity('Минимальная цена за ночь:10000');
    priceInput.reportValidity();
    priceInput.placeholder = '10000';
  } else {
    priceInput.setCustomValidity('');
  }
};

priceInput.addEventListener('input', onTypeInputClick);
typeOfAccomodation.addEventListener('change', onTypeInputClick);

// поля заезда и выезда
var checkIn = document.querySelector('#timein');
var checkOut = document.querySelector('#timeout');
var checkInListener = function () {
  checkOut.value = checkIn.value;
};
var checkOutListener = function () {
  checkIn.value = checkOut.value;
};
checkIn.addEventListener('change', checkInListener);
checkOut.addEventListener('change', checkOutListener);

// валидация формы для фото
var imgOfHouse = document.querySelector('#images');
var imgOfHost = document.querySelector('#avatar');
imgOfHost.setAttribute('accept', 'image/*');
imgOfHouse.setAttribute('accept', 'image/*');
var pins = Array.from(document.querySelectorAll('.map__pin'));
var setPinAttribute = function () {
  for (var i = 1; i < pins.length; i++) {
    pins[i].setAttribute('data-index-number', i - 1);
  }
};
setPinAttribute();
var onPopUpClose = function (card) {
  card.classList.add('hidden');
  card.remove();
};
var onCardCloseEsc = function (card) {
  return function (evt) {
    if (evt.key === 'Escape') {
      card.classList.add('hidden');
      card.remove();
    }
  };
};
var onPinClick = function (evt) {
  var pin = evt.target.closest('.map__pin');
  var j = pin.dataset.indexNumber;
  addAdvertismentCard(advertisments[j]);
  var card = document.querySelector('.map__card');
  card.classList.remove('hidden');
  var cardClose = document.querySelector('.popup__close');
  cardClose.addEventListener('click', function () {
    onPopUpClose(card);
  });
  document.addEventListener('keydown', function () {
    onCardCloseEsc(card);
  });
};
mapPins.addEventListener('click', onPinClick);

