const bigPicture = document.querySelector(".big-picture");
const body = document.querySelector("body");
const bigPictureImg = bigPicture.querySelector(".big-picture__img img");
const bigPictureDesc = bigPicture.querySelector(".social__caption");
const bigPictureCount = bigPicture.querySelector(".likes-count");
const bigPictureCommentQuantity = bigPicture.querySelector(".social__comment-count");
const bigPictureComments = bigPicture.querySelector(".social__comments li");
const bigPictureComment = bigPictureComments.cloneNode(true);
const bigPictureCommentImg = bigPictureComment.querySelector(".social__picture");
const bigPictureCommentDesc = bigPictureComment.querySelector(".social__text");
const closeButton = bigPicture.querySelector(".big-picture__cancel");
const commentFragment = new DocumentFragment();
let currentCommentCount, photoComments, commentsAll;
const currentCommentStep = 5;
const bigPictureCommentsLoad = bigPicture.querySelector(".social__comments-loader");

export function showBigPicture(photos, pictures, comments) {
  commentsAll = comments;
   pictures.querySelectorAll('.picture').forEach((picture) => picture.addEventListener('click', function (e){
     bigPicture.classList.remove("hidden");
     body.classList.add("modal-open");
     const pictureId = picture.dataset.id;
     const photo =  photos[pictureId - 1];
     photoComments = photo.comments;
     currentCommentCount = photoComments.length > currentCommentStep ? currentCommentStep : photoComments.length;
     setDataBigPicture(photo);
     for(let i = 0; i < currentCommentCount; i++){
       const comment = setDataComments(comments[photoComments[i] - 1]);
       commentFragment.appendChild(comment);
     }
     bigPicture.querySelector(".social__comments").replaceChildren(commentFragment);
   }));
}
bigPictureCommentsLoad.addEventListener('click', function (e) {
  LoadCommentStep()
});
function LoadCommentStep() {
  if(photoComments.length > currentCommentCount){
    const currentPhotoComments = photoComments.slice(currentCommentCount);
    const diffBetweenCountComments = photoComments.length - currentCommentCount;
    if(diffBetweenCountComments > currentCommentStep){
      for(let i = 0; i < currentCommentStep; i++){
        const comment = setDataComments(commentsAll[currentPhotoComments[i] - 1]);
        commentFragment.appendChild(comment);
      }
      currentCommentCount += currentCommentStep;
    }else{
      bigPictureCommentsLoad.style.display = "none";
      for(let i = 0; i < diffBetweenCountComments; i++){
        const comment = setDataComments(commentsAll[currentPhotoComments[i] - 1]);
        commentFragment.appendChild(comment);
      }
      currentCommentCount += diffBetweenCountComments;
    }
    bigPictureCommentQuantity.innerHTML = `${currentCommentCount} из <span class="comments-count">${photoComments.length}</span> комментарів`;
    bigPicture.querySelector(".social__comments").appendChild(commentFragment);
  }

  bigPictureCommentsLoad.removeEventListener('click', LoadCommentStep)

}

function setDataBigPicture(photo){
  bigPictureImg.src = photo.url;
  bigPictureCount.innerText = photo.likes;
  bigPictureCommentQuantity.innerHTML = `${currentCommentCount} из <span class="comments-count">${photoComments.length}</span> комментарів`;
  if (photoComments.length > currentCommentStep){
    bigPictureCommentsLoad.style.display = "block";
  }else{
    bigPictureCommentsLoad.style.display = "none";
  }
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
