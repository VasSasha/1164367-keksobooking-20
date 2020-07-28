'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  window.load = function (onSuccess) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', URL, true);
    xhr.responseType = 'json';
    xhr.send();
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess(xhr.response);
      } /* else {
    		onError('Статус ответа: ' + xhr.status);
    	}*/
    });
    var data = xhr.response;
    window.loadData = {
      data: data
    };
  };
})();
