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
<<<<<<< Updated upstream
        onSuccess(xhr.response);
=======
        onAdvertisementsLoad(xhr.response);
>>>>>>> Stashed changes
      } /* else {
    		onError('Статус ответа: ' + xhr.status);
    	}*/
    	window.fileterAdvertisements(xhr.response);
    });
    var data = xhr.response;
    window.loadData = {
      data: data
    };
  };
})();
