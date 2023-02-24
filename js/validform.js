const imgForm = document.querySelector("#upload-select-image");
const hashTagsInput = imgForm.querySelector(".text__hashtags");
const commentInput = imgForm.querySelector(".text__description");
const fileInput = imgForm.querySelector("#upload-file");
const modalImgForm = imgForm.querySelector(".img-upload__overlay");
const closeModalImgFormButton = imgForm.querySelector("#upload-cancel");
const maxCommentsSize = 140;
const maxLenghtHashTags =5;
const maxLenghtHashTag =20;

fileInput.addEventListener('change', () => {
  showModalImgForm();
});

function showModalImgForm (){
  modalImgForm.classList.remove("hidden");
  document.body.classList.add("modal-open");
  fileInput.removeEventListener('change', showModalImgForm);
}

closeModalImgFormButton.addEventListener('click', () => {
  closeModalImgForm();
});

function closeModalImgForm (){
  modalImgForm.classList.add("hidden");
  document.body.classList.remove("modal-open");
  closeModalImgFormButton.removeEventListener('click', closeModalImgForm);
  fileInput.value = '';
}

hashTagsInput.addEventListener('input', function(e){
  validate(e);
});

commentInput.addEventListener('input', function(e){
  commentsValidate(e);
});

function clickEsc(e) {
  if (e.keyCode === 27) {
    closeModalImgForm();
  }
}

hashTagsInput.addEventListener('blur', ()=>{
  document.body.addEventListener('keydown', (e) => clickEsc(e));
}, true);
hashTagsInput.addEventListener('focus', () => {
  document.body.removeEventListener('keydown', (e) => clickEsc(e));
}, true);
commentInput.addEventListener('blur', () => {
  document.body.addEventListener('keydown', (e) => clickEsc(e));
}, true);
commentInput.addEventListener('focus', () => {
  document.body.removeEventListener('keydown', (e) => clickEsc(e));
}, true);


function validate(e) {
  const hashTagsText = e.target.value;
  e.target.setCustomValidity('');
  const re = /(?= #)/g;
  if(hashTagsText.length > 0){
    if(hashTagsText[0] === "#"){
      const hashTags = hashTagsText.split(re).map((item) =>  item.replace(/\s+/g,''));
      if(!isValidHashTag(hashTags)){
        e.target.setCustomValidity("Хеш-тег не має вмістити спец символи і не більше 20 символів");
        e.target.reportValidity();
      }
      if(isDuplicate(hashTags)){
        e.target.setCustomValidity("Хеш-теги не мають співпадати");
        e.target.reportValidity();
      }
      if(hashTags.length > maxLenghtHashTags){
        e.target.setCustomValidity("Максимальна кількість Хеш-тегів => 5");
        e.target.reportValidity();
      }
    }else{
      console.log("popal")
      e.target.setCustomValidity("Поле повинне починатися з '#'");
      e.target.reportValidity();
    }
  }
}

function commentsValidate(e) {
  e.target.setCustomValidity("");
  const commentsText = e.target.value;
    if (commentsText.length === maxCommentsSize){
      e.target.setCustomValidity("Коментар не може бути більше 140 символів");
      e.target.reportValidity();
    }
}

function isDuplicate(hashTags) {
  return new Set(hashTags).size !== hashTags.length
}

function isValidHashTag(hashTags){
  const re = /^#[a-zA-Z0-9]*$/;
  let flag = false;
  hashTags.forEach((hashTag) => {
    if (re.test(hashTag) && hashTag.length < maxLenghtHashTag) {
      flag = true;
    }
    else{
      flag = false;
    }
  });
return flag;
}


