'use strict';
var getRandomElement = function (min, max) {
	var x = Math.floor(min + Math.random() * (max - 1);
	return x;
}
var getAvatar = function () {
	for(var i = 1; i <= 8; i++) {
	var avatar = 'img/avatars/user0' + i + '.png';
  } return avatar;
}
var features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"]
var photos =["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var InformationForPost = {
	avatar: avatar,
	title:'заголовок предложения',
	address: '650, 320',
	price:500 'USD',
	type:'flat',
	rooms: 3,
	guests: 3,
	checkin:'12:00',
	checkout:'14:00',
	features: features[i * getRandomElement(0,5)],
	description:'строка с описанием',
	photos:photos[i * getRandomElement(0,2)],
	location: getRandomElement(0,20) + ' ' + getRandomElement(130,630),
}
var createMassive = function () {
    var advertisments = [];
    for(var i = 0; i < 8; i++){
       advertisments.push();
    }
}