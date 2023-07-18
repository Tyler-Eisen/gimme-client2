import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useRouter } from 'next/router';
import { registerUser } from '../utils/auth'; // Update with path to registerUser
import { getSingleUser } from '../utils/data/userData';

// updated initialState
function RegisterForm({ user, updateUser }) {
  const initialState = {
    uid: user.uid,
    name: '',
    email: '',
    address: '',
    phone: '',
    image_url: '',
  };
  console.warn(user.uid);
  const [formData, setFormData] = useState(initialState);
  const router = useRouter();
  const { id } = router.query;

  // updated useEffect
  useEffect(() => {
    if (user.uid) {
      getSingleUser(user.uid).then((userObj) => {
        setFormData((prevState) => ({
          ...prevState,
          uid: userObj.uid,
          name: userObj.name,
          email: userObj.email,
          address: userObj.address,
          phone: userObj.phone,
          image_url: userObj.image_url,
        }));
      });
    }
  }, [user, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.id) {
      updateUser(user, user.uid).then(() => router.push('/rareUsers/profile'));
    } else {
      registerUser(formData).then(() => updateUser(user.uid));
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" required value={formData.name} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email Address</Form.Label>
        <Form.Control type="email" name="email" required value={formData.email} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" name="address" required value={formData.address} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPhone">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control type="text" name="phone" required value={formData.phone} onChange={handleChange} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicImageUrl">
        <Form.Label>Image URL</Form.Label>
        <Form.Control type="text" name="image_url" required value={formData.image_url} onChange={handleChange} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

RegisterForm.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.string,
    phone: PropTypes.string,
    image_url: PropTypes.string,
  }).isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default RegisterForm;
