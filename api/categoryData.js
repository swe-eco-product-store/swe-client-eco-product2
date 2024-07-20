import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getCategories = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const getSingleCategory = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/categories/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getCategories,
  getSingleCategory,
};
