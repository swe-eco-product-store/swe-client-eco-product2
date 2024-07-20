import { clientCredentials } from '../utils/client';
// API CALLS FOR KITCHENS

const endpoint = clientCredentials.databaseURL;

const getKitchens = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/kitchen.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(Object.values(data)))
    .catch(reject);
});

const deleteSingleKitchen = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/kitchen/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve((data)))
    .catch(reject);
});

const getSingleKitchen = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/kitchen/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const createKitchen = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/kitchen.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

const updateKitchen = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/kitchen/${payload.firebaseKey}.json`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getKitchens,
  createKitchen,
  deleteSingleKitchen,
  getSingleKitchen,
  updateKitchen,
};
