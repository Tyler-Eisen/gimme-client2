import { clientCredentials } from '../client';

const getOrderItems = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/order_items`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createOrderItem = (product, orderId) => new Promise((resolve, reject) => {
  // Adjust the structure of the request body if necessary
  fetch(`${clientCredentials.databaseURL}/order_items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      order_id: orderId, // added the order id here
      product_id: product.id,
      quantity: 1,
    }),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateOrderItem = (orderItem) => new Promise((resolve, reject) => {
  // Adjust the structure of the request body if necessary
  fetch(`${clientCredentials.databaseURL}/order_items/${orderItem.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      quantity: orderItem.quantity,
    }),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteOrderItem = (orderItem) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/order_items/${orderItem.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application.json',
    },
  })
    .then(resolve)
    .catch(reject);
});

export {
  getOrderItems,
  createOrderItem,
  updateOrderItem,
  deleteOrderItem,
};
