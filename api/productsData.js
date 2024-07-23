import { clientCredentials } from '../utils/client';

const endpoint = clientCredentials.databaseURL;

// GET KITCHEN PRODUCTS
const getKitchenProducts = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products?category=1`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// GET BATH PRODUCTS
const getBathProducts = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products?category=2`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// GET PET PRODUCTS
const getPetProducts = () => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products?category=3`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        resolve(data);
      } else {
        resolve([]);
      }
    })
    .catch(reject);
});

// GET PRODUCTS BY CATEGORY ID
const getProductsByCategoryId = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products?orderBy="category_id"="${id}"`, {
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

// GET SINGLE PRODUCT
const getSingleProduct = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// DELETE SINGLE PRODUCT
const deleteSingleProduct = (id) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch(reject);
});

// CREATE PRODUCT
const createProducts = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products.json`, {
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

// UPDATE PRODUCTS

const updateProducts = (payload) => new Promise((resolve, reject) => {
  fetch(`${endpoint}/products/${payload.id}.json`, {
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
  getBathProducts,
  getKitchenProducts,
  getPetProducts,
  getSingleProduct,
  createProducts,
  deleteSingleProduct,
  updateProducts,
  getProductsByCategoryId,
};
