'use strict';
document.querySelector('.map').classList.remove('map--faded');
let type = ['palace', 'flat', 'house', 'bungalow'];
let time = ['12:00', '13:00', '14:00'];
let features = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
let photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

let getRandomElement = function (arr) {return Math.floor(Math.random() * arr.length)};
let getRandomInteger = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
let getRandomArray = function (arr, min = 0, max) {
  let array = [];
  let length = getRandomInteger(min, max);
  for (let i = 0; i < length; i++) {
    array.push(arr[i]);
  }
  return array;
};

let generateArray = function () {
  let array = [];

  for (let i = 0; i < 8; i++) {
    let locationX = getRandomInteger(0, 100);
    let locationY = getRandomInteger(130, 630);
    let checkTime = getRandomElement(time);
    array[i] = {
      "author": {
        "avatar": `img/avatars/user0${i + 1}.png`
      },
      "offer": {
        "title": `Элитное жилье по доступной цене № ${i + 1}`,
        "address": `Обращаться по адресу ${locationX}, ${locationY}`,
        "price": getRandomInteger(300, 500),
        "type": type[getRandomElement(type)],
        "rooms": getRandomInteger(1, 4),
        "guests": getRandomInteger(1, 6),
        "checkin": checkTime,
        "checkout": checkTime,
        "features": getRandomArray(features, 1, features.length),
        "description": 'Хорошая возможность отдохнуть и сэкономить',
        "photos": getRandomArray(photos, 1, photos.length),
        "location": {
          "x": locationX,
          "y": locationY
        }
      }
    }
  }
  return array;
};

let Pins = generateArray();

let getPins = function (arr) {
  let mapPins = document.querySelector('.map__pins');
  let percentWidth = mapPins.offsetWidth/100;

  for (let i = 0; i < arr.length; i++) {
    let fragment = document.createDocumentFragment();
    fragment.appendChild(pin.content.cloneNode(true));

    fragment.querySelector('img').src = arr[i].author.avatar;
    fragment.querySelector('img').alt = arr[i].offer.title;
    console.log(fragment.querySelector('img').alt);
    fragment.querySelector('button').style = `left: ${percentWidth * arr[i].offer.location.x - fragment.querySelector('img').width/2}px; top: ${arr[i].offer.location.y - fragment.querySelector('img').height}px;`;
    mapPins.append(fragment);
  }
};

getPins(Pins);
