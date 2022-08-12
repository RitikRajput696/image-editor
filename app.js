const fileInput = document.querySelector('.file-input');
const chooseImg = document.querySelector('.choose-img');
const previewImg = document.querySelector('.img-preview img');
const filters = document.querySelectorAll('.editing-buttons button');
const filterName = document.querySelector('.filter-info .name');
const filterValue = document.querySelector('.filter-info .value');
const filterSlider = document.querySelector('.slider input');
const rotateOptions = document.querySelectorAll('.rotate-buttons button');
const resetFiltersBtn = document.querySelector('.reset button');

let brightness = 100;
let saturation = 100;
let inversion = 0;
let grayscale = 0;
let rotate = 0;
let flipHorizontal = 1;
let flipVertical = 1;

resetFiltersBtn.addEventListener('click', () => {
  console.log(resetFiltersBtn);
  brightness = 100;
  saturation = 100;
  inversion = 0;
  grayscale = 0;
  rotate = 0;
  flipHorizontal = 1;
  flipVertical = 1;

  applyFilters();
});

function applyFilters() {
  previewImg.style.filter = `
  brightness(${brightness}%) 
  saturate(${saturation}%) 
  invert(${inversion}%) 
  grayscale(${grayscale}%)`;

  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
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
  // console.log(filterSlider.value);
}

rotateOptions.forEach((option) =>
  option.addEventListener('click', () => {
    // console.log(option);
    if (option.id === 'rotate-left') {
      rotate -= 90;
    } else if (option.id === 'rotate-right') {
      rotate += 90;
    } else if (option.id === 'flip-horizontal') {
      flipHorizontal = flipHorizontal === 1 ? -1 : 1;
    } else {
      flipVertical = flipVertical === 1 ? -1 : 1;
    }

    applyFilters();
  })
);
//execute these lines at the end
chooseImg.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', loadImg);
filterSlider.addEventListener('input', updateFilter);
