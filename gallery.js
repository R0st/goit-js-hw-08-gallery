import files from "./gallery-items.js";
// 1.Создание и рендер разметки по массиву данных и предоставленному шаблону.
// 2 Реализация делегирования на галерее ul.js-gallery и получение url большого
// изображения. 
// 3 Открытие модального окна по клику на элементе галереи.
// 4 Подмена значения атрибута src элемента img.lightbox**image. 
// 5 Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]. Очистка значения атрибута
// src элемента img.lightbox**image. Это необходимо для того, чтобы при следующем
// открытии модального окна, пока грузится изображение, мы не видели предыдущее.



const refs = {
  containerGallery: document.querySelector('.js-gallery'),
  overlay: document.querySelector('.lightbox__overlay'),
  lightbox: document.querySelector('.js-lightbox'),
  closeBtn: document.querySelector('[data-action="close-lightbox"]'),
  imgModul: document.querySelector('.lightbox__image'),
};

function createMarkUp(files) {
    return files.map(({preview, original, description}) => {
         return `
    <li class="gallery__item">
  <a class="gallery__link"
     href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
}).join('');
};

refs.containerGallery.insertAdjacentHTML('beforeend', createMarkUp(files));
refs.containerGallery.addEventListener('click', onCreateGalleryClick);

function onCreateGalleryClick(ev) {
  if (!ev.target.classList.contains('gallery__image')) {
    return;
  }
  ev.preventDefault();
  console.log(ev.target);
  const el = ev.target;
  const elCurrent = ev.currentTarget;
  onOpenLightbox(el);
  window.addEventListener('keydown', onEscPress);
  console.log(refs.lightbox);
}

function onOpenLightbox(el) {
  refs.lightbox.classList.add('is-open');
  refs.overlay.addEventListener('click', onCloseLightbox);
  refs.closeBtn.addEventListener('click', onCloseLightbox);
  refs.imgModul.src = el.dataset.source;
  refs.imgModul.alt = el.alt;
  
};

function onCloseLightbox() {
  
  refs.closeBtn.removeEventListener('click', onCloseLightbox);
  refs.lightbox.classList.remove('is-open');
  window.removeEventListener('keydown', onEscPress);
  
  onClearSrc();
};

function onEscPress(ev) {
  if (ev.code === 'Escape') {
    onCloseLightbox();
  }
}

function onClearSrc() {
   refs.imgModul.src = '';
  refs.imgModul.alt = '';
}

// //делаем перелистывания
// const imagesSrc = [];

// document.addEventListener('keydown', (ev) => {
//   let newIndex= imagesSrc.indexOf(refs.imgModul.src);
//   if (newIndex < 0) {
//     return;
//   }
//   if (ev.code === 'ArrowLeft') {
//     newIndex -= 1;
//     if (newIndex===-1) {
//       newIndex = imagesSrc.length-1;
//     } else if (ev.code === 'ArrowRight') {
//       newIndex += 1;
//       if (newIndex === imagesSrc.length) {
//         newIndex = 0;
//       }
//     }
//   }
//   imgModul.src = imagesSrc[newIndex];
// });


