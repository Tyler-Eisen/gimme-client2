import { clientCredentials } from '../client';

const getSingleOrder = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders?buyer_id=${userId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then((data) => {
      resolve(data);
    })
    .catch((error) => {
      console.warn('Error fetching product:', error);
      reject(error);
    });
});

const createOrder = (buyerId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      buyer_id: buyerId,
      is_shipped: false, // Assuming a new order is always not shipped
    }),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateOrder = (order) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/orders/${order.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      is_shipped: order.is_shipped,
      // add more fields here if needed
    }),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export {
  getSingleOrder,
  createOrder,
  updateOrder,
};
