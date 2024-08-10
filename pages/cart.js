import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import ViewCart from '../components/ViewCart';

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartWithQuantity = storedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCart(cartWithQuantity);
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>My Cart</h1>
      <ViewCart cart={cart} removeFromCart={removeFromCart} />
      <Link style={{ textAlign: 'center' }} passHref href="/checkoutpage">
        <Button size="lg">Checkout</Button>
      </Link>
    </div>
  );
};

export default CartPage;
