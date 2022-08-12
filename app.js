const fileInput = document.querySelector(".file-input");
const previewImg = document.querySelector(".img-preview img");

const chooseImg = document.querySelector(".choose-img");

chooseImg.addEventListener("click", () => fileInput.click());

fileInput.addEventListener("change", loadImg);

function loadImg() {
  //getting user selected files
  let file = fileInput.files[0];
  if (!file) return;
  previewImg.src = URL.createObjectURL(file);
  console.log("file is selected");
}
