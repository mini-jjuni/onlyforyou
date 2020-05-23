/** @format */

const gallery = document.querySelector(".gallery");
const modal = document.querySelector(".modal");
const modalImg = modal.querySelector(".modal__pic");
const bntLeft = document.querySelector(".button__left");
const bntRight = document.querySelector(".button__right");

const bgmAudio = document.querySelector("audio");
const bntMusic = document.querySelector(".button__music");

let currentImg = 0;
const last = 33;

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

  currentImg = currentImg - 1;

  if (currentImg === 0) {
    currentImg = 33;
  }

  modalImg.src = `images/${currentImg}.JPG`;
};
const moveToNextImg = (event) => {
  event.preventDefault();

  currentImg = currentImg + 1;

  if (currentImg === last + 1) {
    currentImg = 1;
  }

  modalImg.src = `images/${currentImg}.JPG`;
};

const onClick = (event) => {
  event.preventDefault();
  const pic = event.target;
  currentImg = parseInt(pic.id);

  modal.style.display = "flex";

  modalImg.src = pic.src;
};

const paintPics = () => {
  let num = 0;

  for (num = 0; num < last; num++) {
    const newPicFrame = document.createElement("div");
    const newPic = new Image();
    newPic.src = `images/${num + 1}.JPG`;
    newPic.id = num + 1;
    newPicFrame.classList.add("gallery__pic");
    newPicFrame.append(newPic);

    newPicFrame.addEventListener("click", onClick);

    gallery.append(newPicFrame);
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
