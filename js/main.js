'use strict';
var getRandomElement = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
};
var features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var time = ['12:00', '13:00', '14:00'];
var photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var getArray = function(arr) {
	var randomNumber = getRandomElement(1, arr.length - 1);
	var newArr = [];
 for(var i = 0; i < randomNumber; i++){
	newArr.push(arr[i]);
 } return newArr;
}
var createMassive = function () {
    var advertisments = [];
    for(var i = 1; i <= 8; i++){
    var InformationForPost = {
	avatar:'img/avatars/user0' + i + '.png',
	title:'заголовок предложения',
	address: '650, 320',
	price:500 + 'USD',
	type:'flat',
	rooms: 3, 
	guests: 3,
	checkin:getRandomElement(time),
	checkout:getRandomElement(time),
	features: getArray(features),
	description:'строка с описанием',
	photos: getArray(photos),
	location: {
		X: 
		Y:
	}
  };
       advertisments.push (InformationForPost); 
    }
}