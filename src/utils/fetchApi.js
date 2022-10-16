import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchApi = (query, page, per_page) => {
  const config = {
    params: {
      q: query,
      page,
      key: '29832103-c5c7aecb1381f27e358e050a9',
      image_type: 'photo',
      orientation: 'horizontal',
      per_page,
    },
  };
  return axios(config);
};
