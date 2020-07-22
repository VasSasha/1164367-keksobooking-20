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
  var getMainPinCoords = function (x, y, width, height) {
    document.querySelector('#address').value = (x - 1/2 * width) + ', ' + (y - height);
  }
  window.functions = {
    getRandomSubarray: getRandomSubarray,
    getRandomElement: getRandomElement,
    getMainPinCoords: getMainPinCoords,
  };
})();