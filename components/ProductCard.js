import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import { deleteSingleProduct } from '../api/productsData';

function ProductCard({ Obj, onUpdate }) {
  const deleteThisProduct = () => {
    if (window.confirm(`Delete ${Obj.name}?`)) {
      deleteSingleProduct(Obj.id).then(() => onUpdate());
    }
  };

  return (
    <Card style={{ width: '24rem', margin: '10px' }}>
      <Card.Body>
        <Card.Img variant="top" src={Obj.product_image} alt={Obj.name} style={{ height: '400px' }} />
        <Card.Title>{Obj.name}</Card.Title>
        <Card.Text>{Obj.price}</Card.Text>
        {/* DYNAMIC LINK TO VIEW THE BATH DETAILS  */}
        <Link href={`/bath/${Obj.id}`} passHref>
          <Button variant="primary" className="m-2">Veiw Details</Button>
        </Link>
        {/* DYNAMIC LINK TO EDIT THE BATH DETAILS  */}
        <Link href={`/bath/edit/${Obj.id}`} passHref>
          <Button variant="info">ADD CART</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisProduct} className="m-2">
          DELETE
        </Button>
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  Obj: PropTypes.shape({
    name: PropTypes.string,
    product_image: PropTypes.string,
    price: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ProductCard;
