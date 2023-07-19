import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import getCategories from '../../utils/data/categoryData';
import { useAuth } from '../../utils/context/authContext';
import { createProduct, updateProduct } from '../../utils/data/productData';

const initialState = {
  name: '',
  price: '',
  description: '',
  stock: '',
  image_url: '',
  categories: [],
};

const ProductForm = ({ product }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [currentProduct, setCurrentProduct] = useState(initialState);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then(setCategories)
      .catch(console.error);

    if (product.id) {
      setCurrentProduct({
        ...product,
        seller: user.id,
      });
    }
  }, [product, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCurrentProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (product && product.id) {
      updateProduct(currentProduct.id, { ...currentProduct, seller: user.id })
        .then(() => router.push('/products/product'));
    } else {
      createProduct({ ...currentProduct, seller: user.id })
        .then(() => router.push('/products/product'));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Name</Form.Label>
        <Form.Control
          name="name"
          placeholder="What's this product called?"
          required
          value={currentProduct.name}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price</Form.Label>
        <Form.Control
          name="price"
          placeholder="What's the price of this product?"
          required
          value={currentProduct.price}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          name="description"
          placeholder="Describe this product"
          required
          value={currentProduct.description}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Stock</Form.Label>
        <Form.Control
          name="stock"
          placeholder="How many of this product are in stock?"
          required
          value={currentProduct.stock}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Image Url</Form.Label>
        <Form.Control
          name="image_url"
          placeholder="Place your url here"
          required
          value={currentProduct.image_url}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Category</Form.Label>
        <Form.Select
          name="categories"
          required
          value={currentProduct.categories}
          onChange={handleChange}
        >
          <option value="">Select a Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </Form.Select>
      </Form.Group>

      <Button type="submit">{ product && product.id ? 'Update' : 'Create'} Product</Button>
    </Form>
  );
};

ProductForm.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    description: PropTypes.string,
    stock: PropTypes.string,
    image_url: PropTypes.string,
    // eslint-disable-next-line react/forbid-prop-types
    categories: PropTypes.array,
  }),
};

ProductForm.defaultProps = {
  product: initialState,
};

export default ProductForm;
