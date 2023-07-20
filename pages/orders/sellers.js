import React, { useEffect, useState } from 'react';
import SellerCard from '../../components/SellerCard';
import { getUsers } from '../../utils/data/sellerData';

const SellersPage = () => {
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    getUsers()
      .then(setSellers)
      .catch((error) => {
        console.error('Failed to fetch sellers:', error);
      });
  }, []);

  return (
    <>
      <h1>Sellers</h1>
      <div style={{
        display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center',
      }}
      >
        {sellers.map((seller) => (
          <div key={`seller--${seller.id}`} className="seller">
            <SellerCard
              id={seller.id}
              uid={seller.uid}
              name={seller.name}
              email={seller.email}
              address={seller.address}
              phone={seller.phone}
              imageUrl={seller.image_url}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default SellersPage;
