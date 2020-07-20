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

  window.functions = {
    getRandomSubarray: getRandomSubarray,
    getRandomElement: getRandomElement,
  };
})();
