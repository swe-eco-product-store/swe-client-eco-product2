import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { createProduct, updateProduct } from '../../api/productsData';
import { getCategories } from '../../api/categoryData';

const initialState = {
  name: '',
  price: '',
  description: '',
  product_image: '',
  category: '',
};

const ProductForm = ({ obj }) => {
  const [formData, setFormData] = useState(obj || initialState);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { productId } = router.query;

  useEffect(() => {
    if (obj) {
      setFormData({
        name: obj.name,
        price: obj.price.toString(),
        description: obj.description,
        product_image: obj.product_image,
        category: obj.category,
      });
    }
    getCategories().then((data) => setCategories(data));
  }, [obj]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const product = {
      name: formData.name,
      price: parseFloat(formData.price),
      description: formData.description,
      product_image: formData.product_image,
      category: parseInt(formData.category, 10),
    };

    if (obj) {
      updateProduct(productId, product)
        .then(() => {
          router.back();
          setTimeout(() => window.location.reload(), 100);
        });
    } else {
      createProduct(product).then(() => {
        router.back();
        setTimeout(() => window.location.reload(), 100);
      });
    }
  };

  const categoryOptions = categories.map((category) => (
    <option key={category.id} value={category.id}>
      {category.name}
    </option>
  ));

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            name="price"
            required
            value={formData.price}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            required
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Product Image URL</Form.Label>
          <Form.Control
            name="product_image"
            required
            value={formData.product_image}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select a category</option>
            {categoryOptions}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          {obj ? 'Update Product' : 'Create Product'}
        </Button>
      </Form>
    </>
  );
};

ProductForm.propTypes = {
  obj: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    product_image: PropTypes.string.isRequired,
    category: PropTypes.number.isRequired,
  }),
};

ProductForm.defaultProps = {
  obj: null,
};

export default ProductForm;
