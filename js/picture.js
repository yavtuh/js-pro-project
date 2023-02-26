const pictureFragment = new DocumentFragment();
const pictureTemplate = document.querySelector("#picture");
const pictureElement = pictureTemplate.content.cloneNode(true);
const pictureAttribute = pictureElement.querySelector('.picture')
const pictureImage = pictureElement.querySelector(".picture__img");
const pictureLikes = pictureElement.querySelector(".picture__likes");
const pictureComments = pictureElement.querySelector(".picture__comments");

function getPhotos (e){
  pictureImage.src = e.url;
  pictureLikes.innerHTML = e.likes;
  pictureComments.innerHTML = e.comments.length;
  pictureAttribute.setAttribute("data-id", e.id);
  return pictureElement.cloneNode(true);
}

export function getAllPhotos(photos){
  photos.forEach((photo) => {
    pictureFragment.appendChild(getPhotos(photo));
  });
  return pictureFragment;
}





