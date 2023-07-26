import React, { useContext } from 'react';
import { ShopContext } from '../context/shop-context';

const Cart = () => {
  const { cartItems } = useContext(ShopContext);

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {Object.keys(cartItems).map((productId) => {
        const item = cartItems[productId];
        return (
          <div key={productId} className="cart-item">
            <h3>{item.name}</h3>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Cart;
