const KEY = '26380962-1c7476655555a971bf37ffb07';
const URL = 'https://pixabay.com/api/';

const perPage = 12;
const orientation = 'horizontal';
const imageType = 'photo';
function fetchPixabay(searchValue, page) {
  return fetch(
    `${URL}?key=${KEY}&q=${searchValue}&image_type=${imageType}&orientation=${orientation}&page=${page}&per_page=${perPage}`
  ).then(response => {
    return response.json();
  });
}

export default fetchPixabay;
