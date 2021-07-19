'use strict';

window.addEventListener('load', () => {
  /** Плавная прокрутка к якорям */
  const anchors = document.querySelectorAll('a[href*="#"]');
  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      
      const blockID = anchor.getAttribute('href');
      const blockOffsetTop = document.querySelector(blockID).getBoundingClientRect().top;

      window.scrollBy({ top: (blockOffsetTop), left: 0, behavior: 'smooth' });
    })
  }


  /** Подгрузка изображений */
  const firstImagesLength = 6;
  const loadImagesLength = 3;

  const galleryHideImages = document.querySelectorAll('.gallery__img_hide');
  const firstImagesToShow = [...galleryHideImages].slice(0, firstImagesLength);
  firstImagesToShow.forEach((img) => img.classList.remove('gallery__img_hide'));

  const galleryLoadBtn = document.querySelector('.gallery__btn');
  galleryLoadBtn.addEventListener('click', () => {
    
    const hideImages = document.querySelectorAll('.gallery__img_hide');
    const loadImages = [...hideImages].slice(0, loadImagesLength);

    loadImages.forEach((img) => img.classList.remove('gallery__img_hide'));
  });
});

const bannerBtn = document.querySelector('.banner__btn');
bannerBtn.addEventListener('click', showCallback);

function showCallback() {

}

const galleryImages = document.querySelectorAll('.gallery__img');
const popupImg = document.querySelector('.popup-img');
const popupImgValue = document.querySelector('.popup-img__img');
let imgIndex = 0;

galleryImages.forEach(img => {
  img.addEventListener('click', () => {
    popupImgValue.src = img.src;
    imgIndex = +img.dataset.index;
    popupImg.classList.remove('popup-img_hide');
  });
})

popupImg.addEventListener('click', (e) => {
  if (e.target.className.includes('popup-img') && !e.target.className.includes('popup-img__img')) {
    popupImg.classList.add('popup-img_hide');
  }
});

const popupNext = document.querySelector('.popup-img__next');
popupNext.addEventListener('click', () => {
  
  if (imgIndex >= galleryImages.length - 2) {
    return;
  }
  imgIndex++;
  popupImgValue.src = galleryImages[imgIndex - 1].src;
});

const popupPrev = document.querySelector('.popup-img__prev');
popupPrev.addEventListener('click', () => {
  
  if (imgIndex <= 1) {
    return;
  }

  imgIndex--;

  popupImgValue.src = galleryImages[imgIndex - 1].src;
});