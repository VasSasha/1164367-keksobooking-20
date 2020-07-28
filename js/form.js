
'use strict';

(function () {
  var adFieldsets = document.querySelectorAll('.ad-form fieldset');
  var mapFilters = document.querySelectorAll('.map__filters fieldset');
  var adForm = document.querySelector('.ad-form');
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

  // неактивное состояние страницы
  var renderNonActiveCondition = function () {
    getFormsBlocked(adFieldsets);
    getFormsBlocked(mapFilters);
    window.variables.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    var mapPinX = parseInt(window.variables.mainPin.style.left, 10) + 33;
    var mapPinY = parseInt(window.variables.mainPin.style.top, 10) + 33;
    document.querySelector('#address').value = mapPinX + ', ' + mapPinY;
  };


  renderNonActiveCondition();

  // активное состояние страницы
  var renderActiveCondition = function () {
    getFormsUnblocked(adFieldsets);
    getFormsUnblocked(mapFilters);
    window.variables.map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    window.variables.map.classList.add('map--active');
    var addressInput = document.querySelector('#address');
    addressInput.setAttribute('readonly', true);
    window.load(window.onSuccess);
  };

  var onMainPinClick = function (evt) {
    if (evt.button === 0) {
      if (window.variables.map.classList.contains('map--faded')) {
        renderActiveCondition();
      }
    }
  };

  var onMainPinEnterPress = function (evt) {
    if (window.variables.map.classList.contains('map--faded')) {
      if ((window.variables.mainPin === document.activeElement) && (evt.key === 'Enter')) {
        renderActiveCondition();
      }
    }
  };
  window.variables.mainPin.addEventListener('mousedown', onMainPinClick);
  window.variables.mainPin.addEventListener('keydown', onMainPinEnterPress);

  // валидирует форму выдобра количества комнат и гостей
  var guestsSelected = document.querySelector('#capacity');
  var roomsSelected = document.querySelector('#room_number');
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

  document.querySelector('#title').setAttribute('required', true);
  document.querySelector('#title').addEventListener('input', onTitleClick);

  // валидирует стоимость жилья
  var onTypeInputChange = function () {
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

  // поле цены за ночь
  var priceInput = document.querySelector('#price');
  var onInputClick = function () {
    priceInput.setAttribute('required', true);
    var maxValue = 1000000;
    if (priceInput.value > maxValue) {
      priceInput.setCustomValidity('Максимальная доступная цена - 1000000');
      priceInput.reportValidity();
    } else {
      priceInput.setCustomValidity('');
    }
  };
  // влияние типа жилья на цену
  priceInput.addEventListener('input', onInputClick);
  document.querySelector('#type').addEventListener('change', onTypeInputChange);

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
  var form = document.querySelector('.ad-form');
  var removeMessage = function (element) {
    element.remove();
    form.reset();
    renderNonActiveCondition();
    var pins = Array.from(document.querySelectorAll('.map__pin'));
    pins.forEach(function (item, i) {
      if (pins[i].classList.contains('map__pin--main')) {
        return;
      }
      pins[i].remove();
    });
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }
  };
  var removeMessegeOnEsc = function (element, evt) {
    if (evt.key === 'Escape') {
      removeMessage(element);
    }
    document.removeEventListener('keydown', removeMessegeOnEsc);
  };

  var onSuccess = function () {
    var newTemplate = document.querySelector('#success').content.querySelector('div');
    var messege = newTemplate.cloneNode(true);
    messege.children.textContent = document.querySelector('.success__message');
    document.querySelector('main').appendChild(messege);
    messege.addEventListener('click', function () {
      removeMessage(messege);
    });
    removeMessegeOnEsc = removeMessegeOnEsc.bind(null, messege);
    document.addEventListener('keydown', removeMessegeOnEsc);

  };

  var onError = function () {
    var newTemplate = document.querySelector('#error').content.querySelector('div');
    var errorContainer = newTemplate.cloneNode(true);
    errorContainer.querySelector('.error__message').textContent = 'Ошибка загрузки объявления';
    errorContainer.querySelector('.error__button').textContent = 'Попробовать снова';
    document.querySelector('main').appendChild(errorContainer);
    errorContainer.addEventListener('click', function () {
      removeMessage(errorContainer);
    });
    removeMessegeOnEsc = removeMessegeOnEsc.bind(null, errorContainer);
    errorContainer.addEventListener('keydown', removeMessegeOnEsc);
  };

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    window.upload(new FormData(form), onSuccess, onError);
  });
})();

