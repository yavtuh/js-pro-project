import {photos} from './main.js'


const pictures = document.querySelector('.pictures');
const pictureTemplate = document.querySelector("#picture");
const pictureElement = pictureTemplate.content.cloneNode(true);
const pictureImage = pictureElement.querySelector(".picture__img");
const pictureLikes = pictureElement.querySelector(".picture__likes");
const pictureComments = pictureElement.querySelector(".picture__comments");

function getPhotos (e){
  pictureImage.src = `${e.url}`;
  pictureLikes.innerHTML = e.likes;
  pictureComments.innerHTML = e.comments.length;
  return pictures.appendChild(pictureElement.cloneNode(true));
}

const gallery = photos.map((e, index) => getPhotos(e));
console.log(gallery);

