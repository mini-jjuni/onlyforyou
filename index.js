/** @format */

const gallery = document.querySelector(".gallery");
const modal = document.querySelector(".modal");
const modalImg = modal.querySelector(".modal__pic");
const bntLeft = document.querySelector(".button__left");
const bntRight = document.querySelector(".button__right");

const bgmAudio = document.querySelector("audio");
const bntMusic = document.querySelector(".button__music");

let currentImgId;
const lastIdxArr = [33,22,56];
const folderExt = ['JPG', 'JPEG', 'JPEG'];

let isPlaying = false;

const clickMusic = (event) => {
  event.preventDefault();

  if (isPlaying) {
    bgmAudio.pause();
    bntMusic.style.color = "rgba(0, 0, 0, 0.4)";
  } else {
    bgmAudio.play();
    bntMusic.style.color = "rgba(0, 0, 0, 1)";
  }
  isPlaying = !isPlaying;
};

const closeModal = (event) => {
  event.preventDefault();

  if (event.target === modal) modal.style.display = "none";
};

const moveToPrevImg = (event) => {
  event.preventDefault();

  let nextFolder, nextIndex;
  const [folder, index] = currentImgId.split('/').map(v => parseInt(v));

  if(index === 1){
    if(folder === 1) {
      nextFolder = 3;
      nextIndex = lastIdxArr[2];
    } else {
      nextFolder = folder - 1;
      nextIndex = lastIdxArr[nextFolder-1];
    }
  } else {
    nextFolder= folder;
    nextIndex = index - 1;
  }

  currentImgId = `${nextFolder}/${nextIndex}`;

  modalImg.src = `images/${currentImgId}-min.${folderExt[nextFolder-1]}`;
};

const moveToNextImg = (event) => {
  event.preventDefault();

  let nextFolder, nextIndex;
  const [folder, index] = currentImgId.split('/').map(v => parseInt(v));

  console.log(folder, index);

  if(folder === 3 && index === lastIdxArr[2]) {
    nextFolder = 1;
    nextIndex = 1;
  } else if (folder === 2 && index === lastIdxArr[1]){
    nextFolder = folder + 1;
    nextIndex = 1;
  } else if (folder === 1&& index === lastIdxArr[0]) {
    nextFolder = folder + 1; 
    nextIndex = 1;
  } else {
    nextFolder= folder;
    nextIndex = index + 1;
  }

  currentImgId = `${nextFolder}/${nextIndex}`;

  modalImg.src = `images/${currentImgId}-min.${folderExt[nextFolder-1]}`;
};

const onClick = (event) => {
  event.preventDefault();
  const pic = event.target;
  currentImgId = pic.id;

  modal.style.display = "flex";

  modalImg.src = pic.src;
};

const paintPics = () => {
  for (let folder = 1; folder <= 3; folder++) {
    for (let index = 0; index < lastIdxArr[folder-1]; index++)
{    
  console.log("Test", lastIdxArr[folder-1], folder, index);
  const newPicFrame = document.createElement("div");
    const newPic = new Image();
    newPic.src = `images/${folder}/${index + 1}-min.${folderExt[folder-1]}`;
    newPic.id = `${folder}/${index + 1}`;
    newPicFrame.classList.add("gallery__pic");
    newPicFrame.append(newPic);

    newPicFrame.addEventListener("click", onClick);

    gallery.append(newPicFrame);
  }
  }
};

const init = () => {
  paintPics();

  modal.addEventListener("click", closeModal);
  bntLeft.addEventListener("click", moveToPrevImg);
  bntRight.addEventListener("click", moveToNextImg);
  bntMusic.addEventListener("click", clickMusic);
};

if (gallery) {
  init();
}
