import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';

function Checkout() {
  const [rating, setRating] = useState(0);

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
        <Button varient="warning" onClick={() => { alert('Thank you for your feedback!'); }}>Submit feedback </Button>
      </div>
    </Alert>
  );
}

export default Checkout;
