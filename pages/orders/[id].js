import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import { getProductsBySeller } from '../../utils/data/productData';
import { useAuth } from '../../utils/context/authContext';

function SellerProducts() {
  const [products, setProducts] = useState([]);
  const { user } = useAuth();

  const showProducts = () => {
    getProductsBySeller(user.id).then((data) => setProducts(data));
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
