'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  window.load = function (onAdvertisementsLoad) {
    var xhr = new XMLHttpRequest();

    xhr.responseType = 'json';
    xhr.open('GET', URL);
    xhr.send();
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        window.map.onAdvertisementsLoad(xhr.response);
      } /* else {
    		onError('Статус ответа: ' + xhr.status);
    	}*/
    });

  };
})();
