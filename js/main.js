'use strict';
var getRandomElement = function (min, max) {
	var x = Math.floor(min + Math.random() * (max - 1));
	return x;
}
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
    for(var i = 0; i < 8; i++){
    var InformationForPost = {
	avatar:'img/avatars/user0' + i + '.png',
	title:'заголовок предложения',
	address: '650, 320',
	price:500 + 'USD',
	type:'flat',
	rooms: 3,
	guests: 3,
	checkin:time[i * getRandomElement(0,2)],
	checkout:time[i * getRandomElement(0,2)],
	features: getArray(features),
	description:'строка с описанием',
	photos: getArray(photos),
	location: {
		X: getRandomElement(0,20),
		Y: getRandomElement(130,630),
	}
  };
       advertisments.push (InformationForPost); 
    }
}