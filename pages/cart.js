import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import ViewCart from '../components/ViewCart';

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const calculateTotal = (cartItems) => cartItems.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartWithQuantity = storedCart.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCart(cartWithQuantity);
    setTotal(calculateTotal(cartWithQuantity));
  }, []);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    setTotal(calculateTotal(updatedCart));
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  return (
    <div>
      <h1>My Cart</h1>
      <ViewCart cart={cart} removeFromCart={removeFromCart} />
      <h2>Total: ${total.toFixed(2)}</h2>
      <Link passHref href="/checkoutpage">
        <Button size="lg">Checkout</Button>
      </Link>
    </div>
  );
};

export default CartPage;
