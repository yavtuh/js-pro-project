import {getAllPhotos} from "./picture.js";
import {showBigPicture} from "./bigpicture.js";
import {mainFilterFunction} from "./editphoto.js";
import {mainSendForm} from "./sendphoto.js";
import "./sort.js";

const photosArray = await fetch("http://localhost:4000/photos")
  .then(function (resp) {
    return resp.json();
  })
  .catch((error) => {
     return error;
  });

const photos = photosArray.photos;
const comments = photosArray.comments;

console.log(comments)
const gallery = getAllPhotos(photos);

const pictures = document.querySelector('.pictures');
pictures.appendChild(gallery);

showBigPicture(photos, pictures, comments);

mainFilterFunction();

mainSendForm();


