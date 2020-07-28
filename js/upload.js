'use strict';

(function () {

  var URL = 'https://javascript.pages.academy/keksobooking';
  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', URL);
    xhr.send(data);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccess();
      } else {
        onError();
      }
    });
  };
})();
