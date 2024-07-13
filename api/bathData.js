import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

const getBath = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bath.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(Object.values(data));
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// FIXME: CREATE BATH ITEMS
const createBath = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bath.json`, {
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
// FIXME: GET SINGLE BATH ITEM
const getSingleBath = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bath/${firebaseKey}.json`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// FIXME: DELETE BATH ITEM
const deleteSingleBath = (firebaseKey) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bath/${firebaseKey}.json`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// FIXME: UPDATE BATH ITEM
const updateBath = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bath/${payload.firebaseKey}.json`, {
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
// // TODO: GET A SINGLE USER'S BATH ITEMS
// const getUserBath = (firebaseKey) => new Promise((resolve, reject) => {
//   fetch(`${endpoint}/bath.json?orderBy="user_id"&equalTo="${firebaseKey}"`, {
//     method: 'GET',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((response) => response.json())
//     .then((data) => resolve(Object.values(data)))
//     .catch(reject);
// });

const favoriteBath = (uid) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/bath.json?orderBy="uid"&equalTo="${uid}"`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      const favorites = Object.values(data).filter((item) => item.favorite);
      resolve(favorites);
    })
    .catch(reject);
});

export {
  getBath,
  createBath,
  getSingleBath,
  deleteSingleBath,
  updateBath,
  favoriteBath,
  // getAuthorBooks,
};
