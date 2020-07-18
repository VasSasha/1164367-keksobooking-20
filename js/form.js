
'use strict';
(function formConditions() {
  var adFieldsets = document.querySelectorAll('.ad-form fieldset');
  var mapFilters = document.querySelector('.map__filters fieldset');
  var adForm = document.querySelector('.ad-form');
  // неактивное состояние страницы
  var renderNonActiveCondition = function () {
    window.funtions.getFormsBlocked(adFieldsets);
    window.funtions.getFormsBlocked(mapFilters);
    window.util.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    var mapPinX = parseInt(window.util.mainPin.style.left, 10) + 33;
    var mapPinY = parseInt(window.util.mainPin.style.top, 10) + 33;
    document.querySelector('#address').value = mapPinX + ', ' + mapPinY;
  };


  renderNonActiveCondition();

  // активное состояние страницы
  var renderActiveCondition = function () {
    window.funtions.getFormsUnblocked(adFieldsets);
    window.funtions.getFormsUnblocked(mapFilters);
    window.util.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    var addressInput = document.querySelector('#address');
    addressInput.setAttribute('disabled', true);

  };
  window.util.mainPin.addEventListener('mousedown', window.funtions.onMainPinClick);
  window.util.mainPin.addEventListener('keydown', window.funtions.onMainPinEnterPress);
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
    window.util.priceInput.setAttribute('required', true);
    var maxValue = 1000000;
    if (window.util.priceInput.value > maxValue) {
      window.util.priceInput.setCustomValidity('Максимальная доступная цена - 1000000');
      window.util.priceInput.reportValidity();
    }
  };

  getPriceInputValid();

  // влияние типа жилья на цену
  window.util.priceInput.addEventListener('input', window.functions.getTypeInputValid);
  document.querySelector('#type').addEventListener('change', window.functions.getTypeInputValid);

  // поля заезда и выезда
  var checkIn = document.querySelector('#timein');
  var checkOut = document.querySelector('#timeout');
  checkIn.addEventListener('change', window.functions.checkInListener);
  checkOut.addEventListener('change', window.functions.checkOutListener);

  // валидация формы для фото
  window.util.imgOfHost.setAttribute('accept', 'image/*');
  window.util.imgOfHouse.setAttribute('accept', 'image/*');
  window.util.mainPin.addEventListener('mousedown', window.functions.onMainPinPlaceChange);
  window.formValidation = formValidation;
})();

