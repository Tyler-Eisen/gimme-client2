import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
import {
  updateOrderItem, deleteOrderItem,
} from '../utils/data/orderItemData';
// import { useAuth } from '../utils/context/authContext';

export const ShopContext = createContext(null);

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  // const { user } = useAuth();

  useEffect(() => {
    setCartItems({});
  }, []);

  const addToCart = (product) => {
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [product.id]: (prevCartItems[product.id] || 0) + 1,
    }));
  };

  const removeFromCart = (product) => {
    if (cartItems[product.id]) {
      const updatedOrderItem = {
        ...product,
        quantity: cartItems[product.id] - 1,
      };
      if (updatedOrderItem.quantity > 0) {
        updateOrderItem(updatedOrderItem).then(() => {
          setCartItems({
            ...cartItems,
            [product.id]: updatedOrderItem.quantity,
          });
        });
      } else {
        deleteOrderItem(product).then(() => {
          const newCartItems = { ...cartItems };
          delete newCartItems[product.id];
          setCartItems(newCartItems);
        });
      }
    }
  };
  console.warn(cartItems);
  return (
    <ShopContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </ShopContext.Provider>
  );
};
ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
