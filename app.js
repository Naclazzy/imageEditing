const fileInput = document.querySelector(".file-input");
const chooseImgBtn = document.querySelector(".choose-img"); 
const showImage = document.querySelector(".preview-img img");  
const filterName = document.querySelector(".filter-info .name");       
const filterOptions = document.querySelectorAll(".filter button");  
const filterSlider = document.getElementById("in");     
const inputValue = document.querySelector(".value");
const rotateOptions = document.querySelectorAll(".rotate button");
const resetButton = document.querySelector(".reset-filter");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;
let rotate = 0; 
let flipHorizontal = 1;
let flipVertical = 1;



const applyFilters = () => {
    showImage.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
    showImage.style.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
}



const loadImage = () => {
    let file = fileInput.files[0];
    if(!file) return; 
    showImage.src = URL.createObjectURL(file)
    showImage.addEventListener("load", () => {
        document.querySelector(".container").classList.remove("disable");
    })
}

filterOptions.forEach(option => {
    option.addEventListener("click", () => {
        document.querySelector(".filter .active").classList.remove("active")
        option.classList.add("active");
        filterName.innerText = option.innerText;

        if(option.id === "brightness"){
            filterSlider.max = "200";
            filterSlider.value = brightness;
            inputValue.innerText = `${brightness}%`;
        } else if(option.id === "saturation"){
            filterSlider.max = "200";
            filterSlider.value = saturation;
            inputValue.innerText = `${saturation}%`;
        } else if(option.id === "inversion"){
            filterSlider.max = "100";
            filterSlider.value = inversion; 
            inputValue.innerText = `${inversion}%`;
        } else if(option.id === "grayscale"){
            filterSlider.max = "100";
            filterSlider.value = grayscale; 
            inputValue.innerText = `${grayscale}%`;
        }
    })
})

const updateFilter = () => {
    inputValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active")

    if(selectedFilter.id === "brightness"){
        brightness = filterSlider.value;
    } else if(selectedFilter.id === "saturation") {
        saturation  = filterSlider.value;
    } else if(selectedFilter.id === "inversion"){
        inversion = filterSlider.value;
    } else if(selectedFilter.id === "grayscale"){
        grayscale = filterSlider.value;
    }
    applyFilters();
}
Array.from(rotateOptions).forEach(option => {
    option.addEventListener("click", () => {
           if(option.id === "left"){
            rotate -= 90;
           } else if(option.id === "right"){
            rotate += 90;
           } else if(option.id === "horizontal"){
            flipHorizontal = flipHorizontal === 1 ? -1 : 1;
           } else {
            flipVertical = flipVertical ===  1 ? -1 : 1;
           }
           applyFilters();
    });
});

const resetFilter = () => {
  brightness = 100,
  saturation = 100,
  inversion = 0,
  grayscale = 0;
  rotate = 0;
  flipHorizontal = 1;
  flipVertical = 1;
  filterOptions[0].click();
  applyFilters();
};


resetButton.addEventListener("click", resetFilter)
fileInput.addEventListener("change", loadImage)
chooseImgBtn.addEventListener("click", () => fileInput.click());
filterSlider.addEventListener("input", updateFilter);



