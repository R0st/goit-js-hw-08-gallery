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
}

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
  onOpenLightbox(el);
   window.addEventListener('keydown', onEscPress);
  console.log(refs.lightbox);
}

// refs.lightbox.addEventListener('click', onOpenLightbox);
function onOpenLightbox(el) {
  refs.lightbox.classList.add('is-open');
  refs.overlay.addEventListener('click', onOverlayClick);
  refs.closeBtn.addEventListener('click', onCloseLightbox);
  refs.imgModul.src = el.dataset.source;
  refs.imgModul.alt = el.alt;
  
};

function onCloseLightbox() {
  
  refs.lightbox.classList.remove('is-open');
  window.removeEventListener('keydown', onEscPress);
  onClearSrc();
};

function onOverlayClick() {
  console.log('click on overlay');
  console.log(ev.currentTarget);
  console.log(ev.target);

  if (ev.target === ev.currentTarget) {
    console.log('click in overlay');
    onCloseLightbox();
  }
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
