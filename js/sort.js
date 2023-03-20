import {getAllPhotos} from "./picture.js";
import {showBigPicture} from "./bigpicture.js";

const imgFilters = document.querySelector(".img-filters");
const defaultFilter = document.querySelector("#filter-default");
const randomFilter = document.querySelector("#filter-random");
const discussedFilter = document.querySelector("#filter-discussed");
const pictures = document.querySelector('.pictures');
const filtersButton = document.querySelectorAll(".img-filters__button");
const randomFilterCount = 10;
const wait = 500;

function checkPhotos(){
    const photos = fetch("http://localhost:4000/photos")
    .then(function (resp) {
        return resp.json();
    })
    .catch((error) => {
        return error;
    });
    return photos;
}

const randomFilterFunction = debounce(async function(){
    const photos = await checkPhotos();
    const uniqueArray = randomUnique(photos.photos.length -1, randomFilterCount);
    const randomUniquePhotos =  uniqueArray.map((e) => photos.photos[e]);
    const comments = photos.comments;
    updatePhotos(randomUniquePhotos, comments);
    setActiveButton(randomFilter);
}, wait, true);

const discussedFilterFunction = debounce(async function(){
    const photos = await checkPhotos();
    const sortPhotos = bubbleSortPhotos(photos.photos)
    const comments = photos.comments;
    updatePhotos(sortPhotos, comments);
    setActiveButton(discussedFilter);
}, wait, true);

const defaultFilterFunction = debounce(async function(){
    const photos = await checkPhotos();
    updatePhotos(photos.photos, photos.comments);
    setActiveButton(defaultFilter);
}, wait, true);

function bubbleSortPhotos(photos) {
    for (let j = photos.length - 1; j > 0; j--) {
      for (let i = 0; i < j; i++) {
        if (photos[i].comments.length < photos[i + 1].comments.length) {
          let temp = photos[i];
          photos[i] = photos[i + 1];
          photos[i + 1] = temp;
        }
      }
    }
    return photos;
  }

function randomUnique(range, count){
    let nums = new Set();
    while (nums.size < count) {
        nums.add(Math.floor(Math.random() * (range - 1 + 1) + 1));
    }
    return [...nums];
}

function setActiveButton(button){
    filtersButton.forEach((elem) => elem.setAttribute("class", "img-filters__button"));
    button.classList.add("img-filters__button--active");
}

function updatePhotos(photos, comments){
    document.querySelectorAll('.picture').forEach((elem) => elem.remove());
    const gallery = getAllPhotos(photos);
    pictures.appendChild(gallery);
    showBigPicture(photos, pictures, comments);
}

function debounce(func, wait, immediate) {
    let timeout;

    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
};

randomFilter.addEventListener("click", randomFilterFunction);
discussedFilter.addEventListener("click", discussedFilterFunction);
defaultFilter.addEventListener("click", defaultFilterFunction);
document.addEventListener("DOMContentLoaded", function(){
    imgFilters.style.opacity = 1;
});