const bigPicture = document.querySelector(".big-picture");
const body = document.querySelector("body");
const bigPictureImg = bigPicture.querySelector(".big-picture__img img");
const bigPictureDesc = bigPicture.querySelector(".social__caption");
const bigPictureCount = bigPicture.querySelector(".likes-count");
const bigPictureCommentCount = bigPicture.querySelector(".comments-count")
const bigPictureComments = bigPicture.querySelector(".social__comments li");
const bigPictureComment = bigPictureComments.cloneNode(true);
const bigPictureCommentImg = bigPictureComment.querySelector(".social__picture");
const bigPictureCommentDesc = bigPictureComment.querySelector(".social__text");
const closeButton = bigPicture.querySelector(".big-picture__cancel")
const commentFragment = new DocumentFragment();


export function showBigPicture(photos, pictures, comments) {
   pictures.querySelectorAll('.picture').forEach((picture) => picture.addEventListener('click', function (e){
     bigPicture.classList.remove("hidden");
     body.classList.add("modal-open");
     const pictureId = picture.dataset.id;
     const photo =  photos[pictureId - 1];
     setDataBigPicture(photo);
     for(let i = 0; i < photo.comments.length; i++){
       const comment = setDataComments(comments[photo.comments[i] - 1]);
       commentFragment.appendChild(comment);
     }
     bigPicture.querySelector(".social__comments").replaceChildren(commentFragment);
   }));
}

function setDataBigPicture(photo){
  bigPictureImg.src = photo.url;
  bigPictureCount.innerText = photo.likes;
  bigPictureCommentCount.innerText = photo.comments.length;
  bigPictureDesc.innerText = photo.description;
}

function setDataComments(comment){
  bigPictureCommentImg.src = comment.avatar;
  bigPictureCommentDesc.innerText = comment.message;
  return bigPictureComment.cloneNode(true);
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove("modal-open");
  closeButton.removeEventListener('click', closeBigPicture);

}
closeButton.addEventListener('click', () => {
  closeBigPicture();
})
body.addEventListener('keydown', (e) => {
  if (e.keyCode === 27) {
    closeBigPicture();
  }
})
