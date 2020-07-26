'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking/data';
  window.upload = function (data) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', URL);
    xhr.send(data);
  }
})();
