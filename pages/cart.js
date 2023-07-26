import React from 'react';
import Cart from '../components/Cart';
import { ShopContextProvider } from '../context/shop-context';

const CartPage = () => (
  <ShopContextProvider>
    <Cart />
  </ShopContextProvider>
);

export default CartPage;
