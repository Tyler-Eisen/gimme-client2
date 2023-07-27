import PropTypes from 'prop-types';
import { createContext, useEffect, useState } from 'react';
// import { useAuth } from '../utils/context/authContext';

export const ShopContext = createContext(null);

export const ShopContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  // const { user } = useAuth();

  useEffect(() => {
    const initialCartItems = JSON.parse(localStorage.getItem('cartItems')) || {};
    setCartItems(initialCartItems);
  }, []);

  const addToCart = (product) => {
    setCartItems((prevCartItems) => {
      const updatedCartItems = {
        ...prevCartItems,
        [product.id]: {
          ...product,
          quantity: (prevCartItems[product.id]?.quantity || 0) + 1,
        },
      };
      localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
      return updatedCartItems;
    });
  };

  const removeFromCart = (product) => {
    if (cartItems[product.id]) {
      const updatedOrderItem = {
        ...product,
        quantity: cartItems[product.id].quantity - 1,
      };
      setCartItems((prevCartItems) => {
        let updatedCartItems;
        if (updatedOrderItem.quantity > 0) {
          updatedCartItems = {
            ...prevCartItems,
            [product.id]: updatedOrderItem,
          };
        } else {
          updatedCartItems = { ...prevCartItems };
          delete updatedCartItems[product.id];
        }
        localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
        return updatedCartItems;
      });
    }
  };

  console.warn('cartItems', cartItems);
  return (
    <ShopContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </ShopContext.Provider>
  );
};
ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
