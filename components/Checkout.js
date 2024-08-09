import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

function Checkout() {
  const [rating, setRating] = useState(0);
  const [cart, setCart] = useState([]);
  const [, setTotal] = useState(0);
  const router = useRouter();

  const calculateTotal = (cartItems) => cartItems.reduce((sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 0), 0);

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    setTotal(calculateTotal(updatedCart));
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    alert('Thank You for your feedback');
    router.push('/cart');
  };

  const handleStarClick = (value) => {
    setRating(value);
  };

  return (
    <Alert variant="warning" className="checkout-page">
      <div>
        <h2>Thank You for shopping with us </h2>
        <p>Your Products are on the way</p>
      </div>
      <div className="star-rating">
        <h2>Please Rate Us</h2>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((star) => (
            // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
            <span
              key={star}
              className={`star ${star <= rating ? 'filled' : ''}`}
              onClick={() => handleStarClick(star)}
            >
              ★
            </span>
          ))}
        </div>
        <h4>Your rating: {rating} {rating > 0 ? `star${rating > 1 ? 's' : ''}` : ''}</h4>
        <Button varient="warning" onClick={removeFromCart}>Submit feedback </Button>
      </div>
    </Alert>
  );
}

export default Checkout;
