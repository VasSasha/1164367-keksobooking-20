'use strict';

(function () {

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
  // блокирует формы
  var getFormsBlocked = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].setAttribute('disabled', true);
    }
  };
  // размораживает формы
  var getFormsUnblocked = function (arr) {
    for (var i = 0; i < arr.length; i++) {
      arr[i].removeAttribute('disabled');
    }
  };

  var onMainPinClick = function (evt) {
    if (evt.button === 0) {
      window.formFunctions.renderActiveCondition();
    }
  };

  var onMainPinEnterPress = function (evt) {
    if ((window.variables.mainPin === document.activeElement) && (evt.key === 'Enter')) {
      window.formFunctions.renderActiveCondition();
    }
  };

  var onMainPinPlaceChange = function () {
    var mapPinX = parseInt(window.variables.mainPin.style.left, 10) + 33;
    var mapPinY = parseInt(window.variables.mainPin.style.top, 10) + 65 + 17;
    document.querySelector('#address').value = mapPinX + ', ' + mapPinY;
  };
  // валидирует форму выдобра количества комнат и гостей
  var onFormUse = function () {
    if ((parseInt(window.variables.roomsSelected.value, 10) !== 100) && (parseInt(window.variables.guestsSelected.value, 10) === 0)) {
      document.querySelector('#capacity').setCustomValidity('Единственный вариант не для гостей - "100 комнат"');
      document.querySelector('#capacity').reportValidity();
    } else if ((parseInt(window.variables.roomsSelected.value, 10) === 100) && (parseInt(window.variables.guestsSelected.value, 10) !== 0)) {
      document.querySelector('#capacity').setCustomValidity('Данное количество комнат не предназначено для гостей');
      document.querySelector('#capacity').reportValidity();
    } else if (parseInt(window.variables.roomsSelected.value, 10) < parseInt(window.variables.guestsSelected.value, 10)) {
      document.querySelector('#capacity').setCustomValidity('Количество гостей не должно превышать количество комнат.');
      document.querySelector('#capacity').reportValidity();
    } else {
      document.querySelector('#capacity').setCustomValidity('');
    }
  };
  // валидирует заголовок объявления
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
  // валидирует стоимость жилья
  var onTypeInputClick = function () {
    var priceInput = window.util.priceInput;
    var typeOfAccomodation = document.querySelector('#type');
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
  var checkInListener = function () {
    window.variables.checkOut.value = window.variables.checkIn.value;
  };
  var checkOutListener = function () {
    window.variables.checkIn.value = window.variables.checkOut.value;
  };

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
  window.functions = {
    getRandomSubarray: getRandomSubarray,
    getRandomElement: getRandomElement,
    translateAccomodationType: translateAccomodationType,
    getFormsUnblocked: getFormsUnblocked,
    getFormsBlocked: getFormsBlocked,
    onMainPinClick: onMainPinClick,
    onMainPinEnterPress: onMainPinEnterPress,
    onMainPinPlaceChange: onMainPinPlaceChange,
    guestsAndRoomsValidation: onFormUse,
    getTitleValid: onTitleClick,
    getTypeInputValid: onTypeInputClick,
    checkOutListener: checkOutListener,
    checkInListener: checkInListener,
    onClosePopUpEsc: onClosePopUpEsc,
    closePopUp: closePopUp,
  };
})();
