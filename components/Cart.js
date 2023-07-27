import React, { useContext } from 'react';
import { ShopContext } from '../context/shop-context';
import { createOrder } from '../utils/data/orderData';
import { useAuth } from '../utils/context/authContext';

const Cart = () => {
  const { user } = useAuth();
  const {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
  } = useContext(ShopContext);

  const handleOrderSubmit = () => {
    // Create a new order with the current user's ID
    createOrder(user.id)
      .then(() => {
        // On success, clear the cart
        setCartItems({});
        // Clear the localStorage
        localStorage.removeItem('cartItems');
        // Display a success message or do something else here
        alert('Order Submitted Successfully');
      })
      .catch((error) => {
        // Handle any errors here
        console.error('Failed to submit order:', error);
      });
  };

  const getTotal = () => Object.values(cartItems).reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <p>Total: ${getTotal()}</p>
      <button type="button" onClick={handleOrderSubmit}>Submit Order</button>
      {Object.keys(cartItems).map((productId) => {
        const item = cartItems[productId];
        return (
          <div key={productId} className="cart-item">
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button type="button" onClick={() => addToCart(item)}>Increase Quantity</button>
            <button type="button" onClick={() => removeFromCart(item)}>Decrease Quantity</button>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
