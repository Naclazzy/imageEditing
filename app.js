const fileInput = document.querySelector(".file-input");
const chooseImgBtn = document.querySelector(".choose-img"); 
const showImage = document.querySelector(".preview-img img");  
const filterName = document.querySelector(".filter-info .name");       
const filterOptions = document.querySelectorAll(".filter button");  
const filterSlider = document.getElementById("in");     
const inputValue = document.querySelector(".value");


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
    })
})

const updateFilter = () => {
    inputValue.innerText = filterSlider.value;
}

fileInput.addEventListener("change", loadImage)

chooseImgBtn.addEventListener("click", () => fileInput.click());
filterSlider.addEventListener("input", updateFilter)





