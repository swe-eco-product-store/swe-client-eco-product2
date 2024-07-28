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
  quantity: 0,
};

const ProductForm = ({ productObj }) => {
  const [formData, setFormData] = useState(productObj || initialState);
  const [categories, setCategories] = useState([]);
  const router = useRouter();
  const { productId } = router.query;

  useEffect(() => {
    if (productObj) {
      setFormData({
        name: productObj.name,
        price: productObj.price.toString(),
        description: productObj.description,
        product_image: productObj.product_image,
        category: productObj.category,
        quantity: productObj.quantity,
      });
    }
    getCategories().then((data) => setCategories(data));
  }, [productObj]);

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
      quantity: parseInt(formData.quantity, 10),
    };

    if (productObj) {
      updateProduct(productId, product)
        .then(() => {
          router.push('/products');
        });
    } else {
      createProduct(product).then(() => router.push('/products'));
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
        <Form.Group className="mb-3">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            name="quantity"
            required
            value={formData.quantity}
            onChange={handleChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          {productObj ? 'Update Product' : 'Create Product'}
        </Button>
      </Form>
    </>
  );
};

ProductForm.propTypes = {
  productObj: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    product_image: PropTypes.string.isRequired,
    category: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }),
};

ProductForm.defaultProps = {
  productObj: null,
};

export default ProductForm;
