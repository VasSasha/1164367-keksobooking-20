'use strict';
var getRandomElement = function (arr) {
  var index = Math.floor(Math.random() * arr.length);
  return arr[index];
};
var features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
var time = ['12:00', '13:00', '14:00'];
var photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
var getArray = function(arr) {
	var randomNumber = Math.floor(1 + Math.random() * ((arr.length - 1) - 1));
	var newArr = [];
 for(var i = 0; i < randomNumber; i++){
	newArr.push(arr[i]);
 } return newArr; 
}
var createMassive = function () {
    var advertisments = [];
    for(var i = 1; i <= 8; i++){
    var location = {
		x:Math.random() * 100,
		y:130 + Math.random() * 629
	}
    var informationForPost = {
	avatar:'img/avatars/user0' + i + '.png',
	title:'заголовок предложения',
	address: location.x + ', ' + location.y,
	price:500 + 'USD',
	type:'flat',
	rooms: 3, 
	guests: 3,
	checkin:getRandomElement(time),
	checkout:getRandomElement(time),
	features: getArray(features),
	description:'строка с описанием',
	photos: getArray(photos),
  }
    advertisments.push (informationForPost); 
    }
} return advertisments;
var map = document.querySelector('.map');
map.classList.remove('map--faded');
var renderAdvertisments = function() {
	var mapPins = document.querySelector('.map__pins');
	var fragment = document.createDocumentFragment();
	for(i = 0; i < 8; i++) {
	  var template = document.querySelector('#pin');
	  var newAdd = template.cloneNode(true);
	  var img = newAdd.querySelector('img');
	  img.setAttribute('style', advertisments[i].address);
	  img.setAttribute('src', advertisments[i].avatar);
	  img.setAttribute('alt', advertisments[i].title);
	  mapPins.appendChild(fragment);
	}
}