import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { getSingleProduct } from '../../../utils/data/productData';
import ProductForm from '../../../components/forms/ProductForm';

export default function EditProduct() {
  const [product, setProduct] = useState({});
  const router = useRouter();

  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const parsedId = parseInt(id, 10); // Parse the id as an integer
      getSingleProduct(parsedId).then(setProduct);
    }
  }, [id]);

  return (
    <>
      <Head>
        <title>Update {product.name} </title>
      </Head>
      <ProductForm product={product} />
    </>
  );
}
