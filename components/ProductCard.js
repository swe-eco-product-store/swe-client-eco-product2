import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import Modal from 'react-bootstrap/Modal';
import { deleteSingleProduct } from '../api/productsData';

function ProductCard({ Obj, onUpdate }) {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);
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
        {/* DYNAMIC LINK TO EDIT THE BATH DETAILS  */}
        <Link href={`/bath/edit/${Obj.id}`} passHref>
          <Button variant="info">ADD CART</Button>
        </Link>
        <Button variant="danger" onClick={deleteThisProduct} className="m-2">
          DELETE
        </Button>
        {/* Button to show the modal */}
        <Button variant="info" onClick={handleShowModal} className="m-2">
          DETAILS
        </Button>
      </Card.Body>

      {/* Modal for displaying description */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{Obj.name} Details </Modal.Title>
        </Modal.Header>
        <Modal.Body>{Obj.description}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
}

ProductCard.propTypes = {
  Obj: PropTypes.shape({
    name: PropTypes.string,
    product_image: PropTypes.string,
    price: PropTypes.string,
    id: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ProductCard;
