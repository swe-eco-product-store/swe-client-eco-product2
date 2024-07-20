import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleProduct } from '../api/productsData';

function BathCard({ bathObj, onUpdate }) {
  const deleteThisBath = () => {
    if (window.confirm(`Delete ${bathObj.name}?`)) {
      deleteSingleProduct(bathObj.firebaseKey).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '24rem', margin: '10px' }}>
      <Card.Body>
        <Card.Img variant="top" src={bathObj.product_image} alt={bathObj.name} style={{ height: '400px' }} />
        <Card.Title>{bathObj.name}</Card.Title>
        <Card.Text>{bathObj.price}</Card.Text>
        {/* DYNAMIC LINK TO VIEW THE BATH DETAILS  */}
        <Link href={`/bath/${bathObj.firebaseKey}`} passHref>
          <Button variant="primary" className="m-2">Veiw Details</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE BATH DETAILS  */}
        <Link href={`/bath/edit/${bathObj.firebaseKey}`} passHref>
          <Button variant="info">ADD CART</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisBath} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

BathCard.propTypes = {
  bathObj: PropTypes.shape({
    name: PropTypes.string,
    product_image: PropTypes.string,
    price: PropTypes.string,
    firebaseKey: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default BathCard;
