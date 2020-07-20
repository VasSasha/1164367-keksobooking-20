
'use strict';
(function formConditions() {
  var adFieldsets = document.querySelectorAll('.ad-form fieldset');
  var mapFilters = document.querySelector('.map__filters fieldset');
  var adForm = document.querySelector('.ad-form');
  // неактивное состояние страницы
  var renderNonActiveCondition = function () {
    window.functions.getFormsBlocked(adFieldsets);
    window.functions.getFormsBlocked(mapFilters);
    window.variables.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    var mapPinX = parseInt(window.variables.mainPin.style.left, 10) + 33;
    var mapPinY = parseInt(window.variables.mainPin.style.top, 10) + 33;
    document.querySelector('#address').value = mapPinX + ', ' + mapPinY;
  };


  renderNonActiveCondition();

  // активное состояние страницы
  var renderActiveCondition = function () {
    window.functions.getFormsUnblocked(adFieldsets);
    window.functions.getFormsUnblocked(mapFilters);
    window.variables.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    var addressInput = document.querySelector('#address');
    addressInput.setAttribute('disabled', true);

  };
  window.variables.mainPin.addEventListener('mousedown', window.functions.onMainPinClick);
  window.variables.mainPin.addEventListener('keydown', window.functions.onMainPinEnterPress);
  window.formFunctions = {
    renderActiveCondition: renderActiveCondition,
    renderNonActiveCondition: renderNonActiveCondition,
    formConditions: formConditions,
  };
})();

(function formValidation() {
  // валидация. поле количества комнат и гостей
  document.querySelector('#capacity').addEventListener('change', window.functions.guestsAndRoomsValidation);

  // поле заголовка объявления
  document.querySelector('#title').setAttribute('required', true);
  document.querySelector('#title').addEventListener('input', window.functions.getTitleValid);
  // поле цены за ночь
  var getPriceInputValid = function () {
    window.variables.priceInput.setAttribute('required', true);
    var maxValue = 1000000;
    if (window.variables.priceInput.value > maxValue) {
      window.variables.priceInput.setCustomValidity('Максимальная доступная цена - 1000000');
      window.variables.priceInput.reportValidity();
    }
  };

  getPriceInputValid();

  // влияние типа жилья на цену
  window.variables.priceInput.addEventListener('input', window.functions.getTypeInputValid);
  document.querySelector('#type').addEventListener('change', window.functions.getTypeInputValid);

  // поля заезда и выезда
  var checkIn = document.querySelector('#timein');
  var checkOut = document.querySelector('#timeout');
  checkIn.addEventListener('change', window.functions.checkInListener);
  checkOut.addEventListener('change', window.functions.checkOutListener);

  // валидация формы для фото
  var imgOfHouse = document.querySelector('#images');
  var imgOfHost = document.querySelector('#avatar');
  imgOfHost.setAttribute('accept', 'image/*');
  imgOfHouse.setAttribute('accept', 'image/*');
  window.variables.mainPin.addEventListener('mousedown', window.functions.onMainPinPlaceChange);
  window.formValidation = formValidation;
})();

