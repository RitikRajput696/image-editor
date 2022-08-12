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
function applyFilters() {
  previewImg.style.filter = `brightness(${brightness}) saturate(${saturation}) invert(${inversion}) grayscale(${grayscale})`;
}

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

    // set new updated filter values and remember them
    if (option.id === 'brightness') {
      filterSlider.max = 200;
      filterSlider.value = brightness;
      filterValue.innerText = brightness + '%';
    } else if (option.id === 'saturation') {
      filterSlider.max = 200;
      filterSlider.value = saturation;
      filterValue.innerText = saturation + '%';
    } else if (option.id === 'inversion') {
      filterSlider.max = 100;
      filterSlider.value = inversion;
      filterValue.innerText = inversion + '%';
    } else {
      filterSlider.max = 100;
      filterSlider.value = grayscale;
      filterValue.innerText = grayscale + '%';
    }
  });
});

// update filter values
function updateFilter() {
  filterValue.innerText = filterSlider.value + '%';
  const selectedFilter = document.querySelector('.editing-buttons .active');
  if (selectedFilter.id === 'brightness') {
    brightness = filterSlider.value;
  } else if (selectedFilter.id === 'saturation') {
    saturation = filterSlider.value;
  } else if (selectedFilter.id === 'inversion') {
    inversion = filterSlider.value;
  } else {
    grayscale = filterSlider.value;
  }
  applyFilters();
}
//execute these lines at the end
chooseImg.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', loadImg);
filterSlider.addEventListener('input', updateFilter);
