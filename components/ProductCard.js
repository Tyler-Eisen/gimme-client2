/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';
import { deleteProduct } from '../utils/data/productData';

const ProductCard = ({
  id,
  seller,
  category,
  name,
  price,
  description,
  stock,
  imageUrl,
  onUpdate,
}) => {
  const deleteThisProduct = () => {
    console.warn('Deleting post with ID:', id);
    if (window.confirm('Delete Post?')) {
      deleteProduct(id).then(() => onUpdate());
    }
  };

  const router = useRouter();
  const { user } = useAuth();
  const isCurrentUserPost = user && user.id === seller.id;

  const cardStyles = {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#1E1E1E',
    color: '#fff',
    margin: '10px',
    padding: '10px',
    boxSizing: 'border-box',
  };

  const cardImageStyles = {
    width: '200px',
    height: '200px',
    objectFit: 'cover',
    marginRight: '20px',
  };

  return (
    <Card className="text-center" style={cardStyles}>
      <Link href={`/products/${id}`} passHref>
        <Card.Header style={{ cursor: 'pointer' }}>{name}</Card.Header>
      </Link>
      <Card.Body>
        <Image src={imageUrl} style={cardImageStyles} />
        <Card.Text>Price: {price}</Card.Text>
        <Card.Text>Stock: {stock}</Card.Text>
        <Card.Text>Description: {description}</Card.Text>
        <Card.Text>Categories: {category}</Card.Text>
      </Card.Body>
      {isCurrentUserPost ? (
        <>
          <Button
            className="edit-btn"
            onClick={() => {
              router.push(`/products/edit/${id}`);
            }}
          >
            Edit Post
          </Button>
          <Button
            className="delete-btn"
            onClick={deleteThisProduct}
          >
            Delete
          </Button>
        </>
      ) : null}
    </Card>
  );
};

ProductCard.propTypes = {
  id: PropTypes.number.isRequired,
  seller: PropTypes.object.isRequired,
  category: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  stock: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ProductCard;
