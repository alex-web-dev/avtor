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


//   /** Подгрузка изображений */
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
const callbackPopup = document.querySelector('.callback-popup');
bannerBtn.addEventListener('click', () => {
  callbackPopup.classList.add('callback-popup_active');

});

const callbackPopupClose = callbackPopup.querySelector('.callback-popup__close');
callbackPopupClose.addEventListener('click', () => {
  callbackPopup.classList.remove('callback-popup_active');
});

callbackPopup.addEventListener('click', (e) => {
  if (typeof e.target.className !== 'string') {
    return;
  }

  if (e.target.className.includes('callback-popup_active')) {
    callbackPopup.classList.remove('callback-popup_active');
  }
});

/* Попап галереи */
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


/* Бургер меню*/
const menu = document.querySelector('.menu');
const adaptiveValue = 992;
const toggleMenu = menu.querySelector('.menu__toggle');
const closeMenu = menu.querySelector('.menu__close');

toggleMenu.addEventListener('click', () => {
  menu.classList.toggle('menu_active')
});

closeMenu.addEventListener('click', () => {
  menu.classList.remove('menu_active')
});

menu.addEventListener('click', (e) => {
  if (window.innerWidth > adaptiveValue) {
    return;
  }

  if (e.target.className.includes('header__menu')) {
    menu.classList.remove('menu_active');
  }
});


/* Слайдер видео */
const videoList = document.querySelector('.videos__list');
const videos = videoList.querySelectorAll('.videos__item');
const videosDots = document.querySelectorAll('.videos__dot');
videosDots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    let videoWidth;
    if (window.innerWidth > 1400) {
      videoWidth = 341;
    } else if (window.innerWidth > 992) {
      videoWidth = 205;
    } else {
      videoWidth = 0;
    }

    if (index === 0) {
      videoList.style.transform = `translateX(${videoWidth}px)`;
    } else {
      videoList.style.transform = `translateX(${-videoWidth * (index - 1)}px)`;
    }

    const activeVideo = videoList.querySelector('.videos__item_active');
    const activeDot = document.querySelector('.videos__dot_active');

    activeVideo.classList.remove('videos__item_active');
    activeDot.classList.remove('videos__dot_active');
    
    videos[index].classList.add('videos__item_active');
    videosDots[index].classList.add('videos__dot_active');
  });
})

/* Включение YouTube видео */
const videoPlays = document.querySelectorAll('.videos__watch-btn');
videoPlays.forEach(playBtn => {
  playBtn.addEventListener('click', () => {
    const videoItem = playBtn.closest('.videos__item');

    if (!videoItem.querySelector('iframe')) {
      const videoUrl = playBtn.dataset.url;
      const videoFrame = getYoutubeFrame(videoUrl);
  
      videoItem.appendChild(videoFrame);
    }
  });
})

function getYoutubeFrame(src) {
  const frame = document.createElement('iframe');

  frame.setAttribute('src', `${src}?autoplay=1`);
  frame.setAttribute('width', '100%');
  frame.setAttribute('height', '100%');
  frame.setAttribute('title', 'YouTube video player');
  frame.setAttribute('autoplay', '');
  frame.setAttribute('frameborder', '0');
  frame.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
  frame.setAttribute('allowfullscreen', '');

  return frame;
}


const callbackForms = document.querySelectorAll('.callback-form');
callbackForms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    console.log(form);
    
  });
})