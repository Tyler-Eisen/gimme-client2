import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import ProductCard from '../../components/ProductCard';
import { useAuth } from '../../utils/context/authContext';
import { getProducts } from '../../utils/data/productData';

function Home() {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const { user } = useAuth();
  console.warn(user);

  const showProducts = () => {
    getProducts(user.id).then((data) => setProducts(data));
  };

  useEffect(() => {
    showProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Button
        className="create-btn"
        onClick={() => {
          router.push('/products/new');
        }}
      >
        Create New Product
      </Button>
      <h1>Products</h1>
      <div style={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
      }}
      >
        {products.map((product) => (
          <div key={`product--${product.id}`} className="product">
            <ProductCard
              id={product.id}
              seller={product.seller}
              name={product.name}
              price={product.price}
              description={product.description}
              stock={product.stock}
              imageUrl={product.image_url}
              category={product.category.name}
              onUpdate={showProducts}
            />
          </div>
        ))}
      </div>
    </>
  );
}

export default Home;
