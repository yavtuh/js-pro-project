const pictures = document.querySelector('.pictures');
const pictureTemplate = new DocumentFragment();
const pictureElement = document.createElement("a");
const pictureImage = document.createElement("img");
const pictureInfo = document.createElement("p");
const pictureComments = document.createElement("span");
const pictureLikes = document.createElement("span");

pictureElement.classList.add("picture");
pictureElement.setAttribute("href", "#");
pictureImage.classList.add("picture__img");
pictureImage.setAttribute("width", "182");
pictureImage.setAttribute("height", "182");
pictureImage.setAttribute("alt", "Випадкова фотографія");
pictureInfo.classList.add("picture__info");
pictureComments.classList.add("picture__comments");
pictureLikes.classList.add("picture__likes");

pictureInfo.appendChild(pictureComments);
pictureInfo.appendChild(pictureLikes);
pictureElement.appendChild(pictureImage);
pictureElement.appendChild(pictureInfo);
pictureTemplate.appendChild(pictureElement);

export function getPhotos (e){
  pictureImage.src = `${e.url}`;
  pictureLikes.innerText = e.likes;
  pictureComments.innerText = e.comments.length;
  return pictures.appendChild(pictureTemplate.cloneNode(true));
}




