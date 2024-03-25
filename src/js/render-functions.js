// функції для відображения элементів інтерфейсу

//імпорт бібліотеки

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Функція для відображення галереї зображень
export const renderGallery = images => {
  const galleryContainer = document.getElementById('gallery');

  // Очищуємо контейнер галереї від усіх дочірніх елементів
  while (galleryContainer.firstChild) {
    galleryContainer.removeChild(galleryContainer.firstChild);
  }

  // Якщо масив зображень порожній, виводимо сповіщення та перериваємо виконання функції
  if (images.length === 0) {
    iziToast.info({
      title: 'Info',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
    });
    return;
  }

  // Для кожного зображення створюємо картку и додаємо її у контейнер галереї
  images.forEach(image => {
    const card = createImageCard(image);
    galleryContainer.appendChild(card);
  });

  // Створюємо об'єкт SimpleLightbox
  const lightbox = new SimpleLightbox('.gallery-item', {
    captionsData: 'alt',
    captionDelay: 250,
  });

  // Поновлюємо SimpleLightbox для обліку нових зображень
  lightbox.refresh();
};

// Функція створення картки зображення
const createImageCard = image => {
  const card = document.createElement('a');
  card.classList.add('gallery-item');
  card.href = image.largeImageURL;

  const img = document.createElement('img');
  img.src = image.webformatURL;
  img.alt = image.tags;

  const infoContainer = document.createElement('div');
  infoContainer.classList.add('gallery-item-info');

  const likes = createInfoElement('Likes', image.likes);
  const views = createInfoElement('Views', image.views);
  const comments = createInfoElement('Comments', image.comments);
  const downloads = createInfoElement('Downloads', image.downloads);

  // Додаємо элементи інформації у контейнер
  infoContainer.appendChild(likes);
  infoContainer.appendChild(views);
  infoContainer.appendChild(comments);
  infoContainer.appendChild(downloads);

  card.appendChild(img);
  card.appendChild(infoContainer);

  return card;
};

// Створення элемента інформації
const createInfoElement = (label, value) => {
  const infoElement = document.createElement('div');
  infoElement.classList.add('gallery-item-info-element');

  const labelElement = document.createElement('span');
  labelElement.textContent = `${label}: `;

  const valueElement = document.createElement('span');
  valueElement.textContent = value;

  infoElement.appendChild(labelElement);
  infoElement.appendChild(valueElement);

  return infoElement;
};
