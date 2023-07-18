import { clientCredentials } from '../client';

const getProducts = (uid) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${uid}`,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleProduct = (id) => new Promise((resolve, reject) => {
  // Make a GET request to retrieve a single product by its ID
  fetch(`${clientCredentials.databaseURL}/products/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => resolve(data))
    .catch((error) => {
      console.warn('Error fetching product:', error);
      reject(error);
    });
});

const createProduct = (product) => fetch(`${clientCredentials.databaseURL}/products`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(product),
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error creating product:', error);
    throw error;
  });

const updateProduct = (id, currentProduct) => fetch(`${clientCredentials.databaseURL}/products/${id}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(currentProduct),
})
  .then((response) => response.json())
  .catch((error) => {
    console.error('Error updating product:', error);
    throw error;
  });

const deleteProduct = (product) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/products/${product}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application.json',
    },
  })
    .then((data) => resolve(data))
    .catch(reject);
});

export {
  getProducts,
  deleteProduct,
  getSingleProduct,
  createProduct,
  updateProduct,
};
