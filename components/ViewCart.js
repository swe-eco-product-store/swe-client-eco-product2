import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function ViewCart({ cart, removeFromCart }) {
  const [quantity, setQuantity] = useState(1);
  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <div>
      <h1>View Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((product) => (
          <Card key={product.id} style={{ width: '24rem', margin: '10px' }}>
            <Card.Body>
              <Card.Img variant="top" src={product.product_image} alt={product.name} style={{ height: '400px' }} />
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>{product.price}</Card.Text>
              <Card.Text>Quantity: {product.quantity}</Card.Text>
              {/* QUANTITY DROPDOWN */}
              <Form.Group controlId="formQuantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Select value={quantity} onChange={handleQuantityChange} style={{ width: '100px' }}>
                  {[...Array(10).keys()].map((num) => (
                    <option key={num + 1} value={num + 1}>
                      {num + 1}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Button variant="danger" onClick={() => removeFromCart(product.id)}>
                Remove from Cart
              </Button>
            </Card.Body>
          </Card>
        ))
      )}
    </div>
  );
}

ViewCart.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      product_image: PropTypes.string.isRequired,
      price: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default ViewCart;
