'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  window.load = function (onSuccess, getData) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', URL, true);
    xhr.responseType = 'json';
    xhr.send();
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
        getData(xhr.response);
      } /* else {
    		onError('Статус ответа: ' + xhr.status);
    	}*/
    });
  };
})();
