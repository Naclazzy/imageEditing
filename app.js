const fileInput = document.querySelector(".file-input");
const chooseImgBtn = document.querySelector(".choose-img"); 
const showImage = document.querySelector(".preview-img img");  
const filterName = document.querySelector(".filter-info .name");       
const filterOptions = document.querySelectorAll(".filter button");  
const filterSlider = document.getElementById("in");     
const inputValue = document.querySelector(".value");

let brightness = 100, saturation = 100, inversion = 0, grayscale = 0;

const loadImage = () => {
    let file = fileInput.files[0];
    if(!file) return; 
    console.log(file)
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
}

fileInput.addEventListener("change", loadImage)

chooseImgBtn.addEventListener("click", () => fileInput.click());
filterSlider.addEventListener("input", updateFilter)





