import {getAllPhotos} from "./picture.js";
import {showBigPicture} from "./bigpicture.js";

const countOfOffers = 25;
const countOfComments = 10;
const minLikes = 15;
const maxLikes = 200;
const descriptions = ['description1', 'description2', 'description3'];
const name = ['test1', 'test2', 'test3', 'test4', 'test5', 'test6'];
const messages = ['comments1', 'comments2', 'comments3', 'comments4'];
const countAvatar = 6;

function getRandomNumber(min, max){
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomArray(array){
  const randomArrayNumber = getRandomNumber(0, array.length -1);
  return array[randomArrayNumber];
}

function getComment(index){
  const randomAvatarName = getRandomNumber(1, countAvatar);
  return {
    id: index + 1,
    avatar: `img/avatar-${randomAvatarName}.svg`,
    message: getRandomArray(messages),
    name: name[randomAvatarName - 1],
  };
}

function getRandomComments(){
  const countRandomComments = getRandomNumber(1, comments.length);
  let arrayRandomComments = [];
  for (let i = 0; i < countRandomComments; i++ ){
    arrayRandomComments.push(comments[getRandomNumber(0, comments.length -1)].id);
  }
  return arrayRandomComments;
}

function getOffer(index){
  return {
    id: index + 1,
    url: `photos/${index + 1}.jpg`,
    description: getRandomArray(descriptions),
    likes: getRandomNumber(minLikes, maxLikes),
    comments: getRandomComments(),
  };
}

const comments = new Array(countOfComments).fill(null).map((e, index) => getComment(index));
const photos = new Array(countOfOffers).fill(null).map((e, index) => getOffer(index));
const gallery = getAllPhotos(photos);
const pictures = document.querySelector('.pictures');
pictures.appendChild(gallery);
showBigPicture(photos, pictures, comments);









