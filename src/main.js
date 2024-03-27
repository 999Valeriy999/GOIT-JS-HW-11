// логіка роботи додатку
// імпорт бібліотеки та модулів

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import searchImages from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';

// Посилання на елементи форми пошуку, введення та індикатора завантаження.
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');
const loader = document.querySelector('.loader');

// clearGallery очищує контейнер галереї.
function clearGallery() {
  const galleryContainer = document.getElementById('gallery');
  galleryContainer.innerHTML = '';
}

// hideLoader приховує індикатор завантаження.
function hideLoader() {
  loader.style.display = 'none';
}

// showLoader відображає індикатор завантаження.
const showLoader = () => {
  loader.style.display = 'block';
};

// Обробник події для форми пошуку
searchForm.addEventListener('submit', function (event) {
  event.preventDefault();

  // Отримуємо значення з поля введення і прибираємо пробіли по краях
  const query = searchInput.value.trim();

  // Очищаємо галерею перед новим пошуком
  clearGallery();

  // Якщо запит порожній, виводиться попередження, і відбувається очищення галереї
  if (query === '') {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search term.',
    });
    clearGallery(); // Очищення галереї при введенні порожнього рядка
    return;
  }

  // Інакше, викликається функція showLoader для відображення індикатора завантаження
  showLoader();

  // Відправлення запиту до API
  searchImages(query)
    .then(images => {
      if (images.length === 0) {
        // Якщо зображення не знайдено, виводимо повідомлення про помилку
        iziToast.error({
          title: 'Error',
          message:
            'Sorry, there are no images matching your search query. Please try again.',
        });
      } else {
        renderGallery(images);
        searchInput.value = '';
      }
    })
    .catch(error => {
      console.error('Error in search:', error);
      searchInput.value = '';
      iziToast.error({
        title: 'Error',
        message: 'An error occurred while fetching images. Please try again.',
      });
    })
    .finally(() => {
      hideLoader();
    });
});
