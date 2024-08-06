import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function ViewCart() {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
    const initialQuantities = {};
    storedCart.forEach((item) => {
      initialQuantities[item.id] = item.quantity || 1;
    });
    setQuantities(initialQuantities);
  }, []);

  const handleQuantityChange = (event, productId) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantities((prev) => ({ ...prev, [productId]: newQuantity }));

    const updatedCart = cartItems.map((item) => (item.id === productId ? { ...item, quantity: newQuantity } : item));
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    const updatedCart = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const calculateTotal = () => cartItems.reduce((total, item) => total + (parseFloat(item.price) * (quantities[item.id] || 1)), 0).toFixed(2);

  return (
    <div>
      <h1>View Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map((product) => (
            <Card key={product.id} style={{ width: '24rem', margin: '10px' }}>
              <Card.Body>
                <Card.Img variant="top" src={product.product_image} alt={product.name} style={{ height: '400px' }} />
                <Card.Title>{product.name}</Card.Title>
                <Card.Text>${product.price}</Card.Text>
                <Card.Text>Quantity: {quantities[product.id] || 1}</Card.Text>
                <Form.Group controlId={`formQuantity-${product.id}`}>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Select
                    value={quantities[product.id] || 1}
                    onChange={(e) => handleQuantityChange(e, product.id)}
                    style={{ width: '100px' }}
                  >
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
          ))}
          <div>Total: ${calculateTotal()}</div>
        </>
      )}
    </div>
  );
}

export default ViewCart;
