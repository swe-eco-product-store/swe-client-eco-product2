import React, { useState } from 'react';
import Checkout from '../components/Checkout';

export default function CheckoutPage() {
  const [cart, setCart] = useState([]);
  const [, setTotal] = useState(0);

  const calculateTotal = (cartItems) => cartItems.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    setTotal(calculateTotal(updatedCart));
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return <Checkout removeFromCart={removeFromCart} />;
}
