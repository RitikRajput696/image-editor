const fileInput = document.querySelector('.file-input');
const chooseImg = document.querySelector('.choose-img');
const previewImg = document.querySelector('.img-preview img');
const filters = document.querySelectorAll('.editing-buttons button');
const filterName = document.querySelector('.filter-info .name');
const filterValue = document.querySelector('.filter-info .value');
const filterSlider = document.querySelector('.slider input');

let brightness = 100;
let saturation = 100;
let inversion = 0;
let grayscale = 0;

function loadImg() {
  //getting user selected files
  let file = fileInput.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  previewImg.addEventListener('load', () => {
    document.querySelector('.container').classList.remove('disable');
  });
}

filters.forEach((option) => {
  option.addEventListener('click', () => {
    document
      .querySelector('.editing-buttons .active')
      .classList.remove('active');
    option.classList.add('active');
    filterName.innerText = option.innerText;
    console.log(option);
  });
});
function updateFilter() {
  filterValue.innerText = filterSlider.value + '%';
}
//execute these lines at the end
chooseImg.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', loadImg);
filterSlider.addEventListener('input', updateFilter);
