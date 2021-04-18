import files from "./gallery-items.js";
// 1.Создание и рендер разметки по массиву данных и предоставленному шаблону.
// 2 Реализация делегирования на галерее ul.js-gallery и получение url большого
// изображения. 
// 3 Открытие модального окна по клику на элементе галереи.
// 4 Подмена значения атрибута src элемента img.lightbox**image. 
// 5 Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"]. Очистка значения атрибута
// src элемента img.lightbox**image. Это необходимо для того, чтобы при следующем
// открытии модального окна, пока грузится изображение, мы не видели предыдущее.

const containerGallery = document.querySelector('.js-gallery');

const refs = {
  imgOverlay: document.querySelector('.lightbox__overlay'),
  imgLightbox: document.querySelector('.lightbox'),
  imgCloseLightbox: document.querySelector('.lightbox__button'),
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

containerGallery.insertAdjacentHTML('beforeend', createMarkUp(files));

containerGallery.addEventListener('click', onCreateGalleryClick);
function onCreateGalleryClick(ev) {
  // if (!ev.target.classList.contains('gallery__image')) {
  //   return;
  // }
  ev.preventDefault();
  console.log(ev.target);
}




