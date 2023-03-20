import {getAllPhotos} from "./picture.js";
import {showBigPicture} from "./bigpicture.js";
import {mainFilterFunction} from "./editphoto.js";
import "./sendphoto.js";

const photos = await fetch("http://localhost:4000/photos")
  .then(function (resp) {
    return resp.json();
  })
  .catch((error) => {
     return error;
  });

const comments = await fetch("http://localhost:4000/comments")
  .then(function (resp) {
    return resp.json();
  })
  .catch((error) => {
    return error;
  });

console.log(comments)
const gallery = getAllPhotos(photos);

const pictures = document.querySelector('.pictures');
pictures.appendChild(gallery);

showBigPicture(photos, pictures, comments);

mainFilterFunction();




