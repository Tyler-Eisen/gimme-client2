import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import ProductCard from '../../components/ProductCard';

import { useAuth } from '../../utils/context/authContext';
import { getProductsBySeller } from '../../utils/data/productData';

function SellerProducts() {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();
  const router = useRouter();
  const { id } = router.query;

  const showProducts = () => {
    console.warn({ id });
    getProductsBySeller(id).then((data) => setProducts(data));
  };

  useEffect(() => {
    showProducts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Products by {user.name}</h1>
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
    </div>
  );
}

export default SellerProducts;
