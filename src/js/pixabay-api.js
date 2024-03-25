// функції для HTTP-запитів.
const URL = 'https://pixabay.com/api/';
const API_KEY = '42552421-44c442bdd9fc0080a82eeb482';

function searchImages(query) {
  const apiUrl = `${URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`;

  // надсилання запиту
  return fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (data.hits.length === 0) {
        throw new Error('No images found for the given query.');
      }
      return data.hits;
    })
    .catch(error => {
      console.error('Error fetching images:', error);
      throw error;
    });
}

export default searchImages;
