import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleProduct } from '../api/productsData';

function KitchenCard({ kitchenObj, onUpdate }) {
  const deleteKitchen = () => {
    if (window.confirm(`Delete ${kitchenObj.name}?`)) {
      deleteSingleProduct(kitchenObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '24rem', margin: '10px' }}>
      <Card.Body>
        <Card.Img variant="top" src={kitchenObj.product_image} alt={kitchenObj.name} style={{ height: '400px' }} />
        <Card.Title>{kitchenObj.name}</Card.Title>
        <Card.Text>{kitchenObj.price}</Card.Text>
        {/* DYNAMIC LINK TO VIEW THE kitchen DETAILS  */}
        <Link href={`/kitchen/${kitchenObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">Veiw Details</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE kitchen DETAILS  */}
        <Link href={`/kitchen/edit/${kitchenObj.firebaseKey}`} passHref>
          <Button variant="info">ADD CART</Button>
        </Link>
        <Button variant="danger" onClick={deleteKitchen} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

KitchenCard.propTypes = {
  kitchenObj: PropTypes.shape({
    name: PropTypes.string,
    product_image: PropTypes.string,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default KitchenCard;
