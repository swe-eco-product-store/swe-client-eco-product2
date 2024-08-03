// EditGame.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { getSingleProduct, updateProduct } from '../api/productsData';
import ProductForm from '../components/forms/ProductForm';
import { useAuth } from '../utils/context/authContext';

export default function EditProduct() {
  const [editItem, setEditItem] = useState(null);
  const router = useRouter();
  const { productId } = router.query;
  const { user } = useAuth();

  useEffect(() => {
    if (productId) {
      getSingleProduct(productId).then(setEditItem);
    }
  }, [productId]);

  const handleUpdate = (updatedProduct) => {
    updateProduct(productId, updatedProduct)
      .then(() => router.push('/products'));
  };

  return editItem && user ? (
    <ProductForm obj={editItem} onSubmit={handleUpdate} user={user} />
  ) : (
    <div>Loading...</div>
  );
}
