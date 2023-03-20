import {closeModalImgForm} from "./validform.js";
import {getAllPhotos} from "./picture.js";
import {showBigPicture} from "./bigpicture.js";

const imgForm = document.querySelector("#upload-select-image");
const successTemplate = document.querySelector("#success");
const success = successTemplate.content.cloneNode(true);
const successButton = success.querySelector(".success__button");
const errorTemplate = document.querySelector("#error");
const error = errorTemplate.content.cloneNode(true);
const errorButton = error.querySelector(".error__button");
const body = document.querySelector("body");

async function sendForm(e){
    e.preventDefault();
    
    const formData = new FormData();
    const fileField = e.target.querySelector('#upload-file');
    const hashTagsInput = e.target.querySelector(".text__hashtags");
    const commentInput = e.target.querySelector(".text__description");
    const hiddenScale = e.target.querySelector(".hidden-scale");
    const hiddenEffect = e.target.querySelector(".hidden-effect");

   
    formData.append("avatar", fileField.files[0]);
    formData.append("hashTagsInput", hashTagsInput);
    formData.append("hashTagsInput", commentInput);
    formData.append("hiddenScale", hiddenScale);
    formData.append("hiddenEffect", hiddenEffect);
        await fetch("http://localhost:4000/sendform", {
        method: "POST",
        body: formData,
        })
        .then((response) => response.json())
        .then((result) => {
            updateGalleryPhoto(result);
            closeModalImgForm();
            showSuccesMessage();
        })
        .catch((error) => {
            closeModalImgForm();
            showErrorMessage();
        });
}

function updateGalleryPhoto(data){

    document.querySelectorAll('.picture').forEach((elem) => elem.remove());

    const photos = data.photos;
    const comments = data.comments;

    const gallery = getAllPhotos(photos);

    const pictures = document.querySelector('.pictures');
    pictures.appendChild(gallery);

    showBigPicture(photos, pictures, comments);

}

function showSuccesMessage(){
    body.appendChild(success);
}

function hideSuccessMessage(){
    successButton.removeEventListener("click", hideSuccessMessage);
    document.querySelector(".success").remove();
}

function showErrorMessage(){
    body.appendChild(error);
}

function hideErrrorMessage(){
    errorButton.removeEventListener("click", hideErrrorMessage);
    document.querySelector(".error").remove();
}

body.addEventListener('keydown', (e) => {
    if (e.keyCode === 27) {
        hideErrrorMessage();
        hideSuccessMessage();
    }
  })

export function mainSendForm(){
    errorButton.addEventListener("click", hideErrrorMessage);
    successButton.addEventListener("click", hideSuccessMessage);
    imgForm.addEventListener("submit", sendForm);
}

