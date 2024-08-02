import React, { useState, useEffect } from 'react';
import ViewCart from '../components/ViewCart';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div>
      <h1>My Cart</h1>
      <ViewCart cart={cart} removeFromCart={removeFromCart} />
    </div>
  );
};

export default CartPage;
