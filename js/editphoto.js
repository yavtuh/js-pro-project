const mainPhoto = document.querySelector(".img-upload__preview img");
const inputValueScale = document.querySelector(".scale__control--value");
const plus = document.querySelector(".scale__control--bigger");
const minus = document.querySelector(".scale__control--smaller");
const boxSlider = document.querySelector(".img-upload__effect-level");
const slider = boxSlider.querySelector(".effect-level__slider");
const valueSlider = boxSlider.querySelector(".effect-level__value");
const filters = document.querySelectorAll(".effects__radio");
const hiddenInputScale = document.querySelector(".hidden-scale");
const hiddenInputFilter = document.querySelector(".hidden-effect");

const settingsZoom = {
    step: 25,
    scale: 100,
    maxStep: 100,
    minStep: 25
}

const settingFilter = {
    chrome:{
        filter: "grayscale",
        step: 0.1,
        measure: "",
        min: 0,
        max: 1,
        start: 0
    },
    sepia: {
        filter: "sepia",
        step: 0.1,
        measure: "",
        min: 0,
        max: 1,
        start: 0
    },
    marvin: {
        filter: "invert",
        step: 1,
        measure: "%",
        min: 0,
        max: 100,
        start: 0
    },
    phobos: {
        filter: "blur",
        step: 0.1,
        measure: "px",
        min: 0,
        max: 3,
        start: 0
    },
    heat: {
        filter: "brightness",
        step: 0.1,
        measure: "",
        min: 0,
        max: 3,
        start: 0
    }

}

function biggerPhoto(){
    if(settingsZoom.scale < settingsZoom.maxStep){
        settingsZoom.scale += settingsZoom.step;
        inputValueScale.value = `${settingsZoom.scale}%`;
        hiddenInputScale.value = settingsZoom.scale;
        mainPhoto.style.transform = `scale(${ (settingsZoom.scale) /100})`;
    } 
}

function smallerPhoto(){
    if(settingsZoom.scale > settingsZoom.minStep){
        settingsZoom.scale -= settingsZoom.step;
        inputValueScale.value = `${settingsZoom.scale}%`;
        hiddenInputScale.value = settingsZoom.scale;
        mainPhoto.style.transform = `scale(${ (settingsZoom.scale) /100})`;
    }
}
function getFilter(filter){
    if(filter === "none"){
        boxSlider.style.display = "none";
        mainPhoto.style.filter = "none";
        mainPhoto.setAttribute("class", "");
    }else{
        boxSlider.style.display = "block";
        mainPhoto.setAttribute("class", `effects__preview--${filter}`);
        addSlider(filter);
        addFilter(filter);
    }
}

function addSlider(filter){
    const filterObj = settingFilter[filter];
    noUiSlider.create(slider, {
        start: filterObj.start,
        tooltips: true,
        connect: true,
        step: filterObj.step,
        range: {
            'min': filterObj.min,
            'max': filterObj.max
        }
    });
}

function addFilter(filter){
    const filterObj = settingFilter[filter];
    slider.noUiSlider.on("update", function (value) {
        mainPhoto.style.filter = `${filterObj.filter}(${value}${filterObj.measure})`;
        hiddenInputFilter.value = `${filterObj.filter}(${value}${filterObj.measure})`;
        valueSlider.value = value.join();
    });
}


export function mainFilterFunction(){
    filters.forEach((filter) => {
        filter.addEventListener('click', function(e){
            if(typeof slider.noUiSlider !== 'undefined'){
                slider.noUiSlider.destroy();
            }
            getFilter(e.target.value);
        });
    });
    plus.addEventListener('click', biggerPhoto);
    minus.addEventListener('click', smallerPhoto);
}
document.addEventListener("DOMContentLoaded", (event) => {
    boxSlider.style.display = "none";
});
