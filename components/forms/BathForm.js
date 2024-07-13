import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useAuth } from '../../utils/context/authContext';
import { createBath, getBath, updateBath } from '../../api/bathData';

const initialState = {
  description: '',
  image: '',
  price: '',
  sale: false,
  title: '',
};

function BathForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [baths, setBath] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getBath(user.uid).then(setBath);

    if (obj.firebaseKey) setFormInput(obj);
  }, [obj, setBath, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.firebaseKey) {
      updateBath(formInput).then(() => router.push(`/bath/${obj.firebaseKey}`));
    } else {
      const payload = { ...formInput, uid: user.uid };
      createBath(payload).then(({ name }) => {
        const patchPayload = { firebaseKey: name };
        updateBath(patchPayload).then(() => {
          router.push('/');
        });
      });
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h2 className="text-white mt-5">{obj.firebaseKey ? 'Update' : 'Create'} A Bathroom Product</h2>

      {/* TITLE INPUT  */}
      <FloatingLabel controlId="floatingInput1" label="Bath Product Title" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter a title"
          name="title"
          value={formInput.title}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* IMAGE INPUT  */}
      <FloatingLabel controlId="floatingInput2" label="Bath Product Image" className="mb-3">
        <Form.Control
          type="url"
          placeholder="Enter an image url"
          name="image"
          value={formInput.image}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* PRICE INPUT  */}
      <FloatingLabel controlId="floatingInput3" label="Bath Product Price" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter price"
          name="price"
          value={formInput.price}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* AUTHOR SELECT */}
      <FloatingLabel controlId="floatingSelect" label="Bath Product">
        <Form.Select
          aria-label="Author"
          name="author_id"
          onChange={handleChange}
          className="mb-3"
          value={obj.author_id} // FIXME: modify code to remove error
          required
        >
          <option value="">Select a Bath Item</option>
          {
            baths.map((author) => (
              <option
                key={author.firebaseKey}
                value={author.firebaseKey}
              >
                {author.first_name} {author.last_name}
              </option>
            ))
          }
        </Form.Select>
      </FloatingLabel>

      {/* DESCRIPTION TEXTAREA  */}
      <FloatingLabel controlId="floatingTextarea" label="Description" className="mb-3">
        <Form.Control
          as="textarea"
          placeholder="Description"
          style={{ height: '100px' }}
          name="description"
          value={formInput.description}
          onChange={handleChange}
          required
        />
      </FloatingLabel>

      {/* A WAY TO HANDLE UPDATES FOR TOGGLES, RADIOS, ETC  */}
      <Form.Check
        className="text-white mb-3"
        type="switch"
        id="sale"
        name="sale"
        label="On Sale?"
        checked={formInput.sale}
        onChange={(e) => {
          setFormInput((prevState) => ({
            ...prevState,
            sale: e.target.checked,
          }));
        }}
      />

      {/* SUBMIT BUTTON  */}
      <Button type="submit">{obj.firebaseKey ? 'Update' : 'Create'} Bath Product</Button>
    </Form>
  );
}

BathForm.propTypes = {
  obj: PropTypes.shape({
    description: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.string,
    sale: PropTypes.bool,
    title: PropTypes.string,
    author_id: PropTypes.string,
    firebaseKey: PropTypes.string,
  }),
};

BathForm.defaultProps = {
  obj: initialState,
};

export default BathForm;
