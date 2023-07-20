import PropTypes from 'prop-types';
import React from 'react';
import { Button, Card, Image } from 'react-bootstrap';
import Link from 'next/link';
import { useAuth } from '../utils/context/authContext';

const SellerCard = ({
  id,
  name,
  imageUrl,
}) => {
  const { user } = useAuth();
  const isCurrentUser = user && user.id === id;

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
      <Link href={`/sellers/${id}`} passHref>
        <Card.Header style={{ cursor: 'pointer' }}>{name}</Card.Header>
      </Link>
      <Card.Body>
        <Image src={imageUrl} style={cardImageStyles} />
      </Card.Body>
      {isCurrentUser ? null : (
        <Link href={`/orders/${id}`} passHref>
          <Button>View Products</Button>
        </Link>
      )}
    </Card>
  );
};

SellerCard.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

export default SellerCard;
