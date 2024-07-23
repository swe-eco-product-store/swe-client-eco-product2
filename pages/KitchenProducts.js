import React, { useEffect, useState } from 'react';
import { getKitchenProducts } from '../api/productsData';
import ProductCard from '../components/ProductCard';

function ViewKitchenProducts() {
  const [kitchenProducts, setKitchenProducts] = useState([]);

  const getAllKitchenProducts = () => {
    getKitchenProducts()
      .then((data) => {
        setKitchenProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching kitchen products:', error);
      });
  };

  useEffect(() => {
    getAllKitchenProducts();
  }, []);

  return (
    <div>
      {kitchenProducts.map((product) => (
        <ProductCard key={product.id} Obj={product} onUpdate={getAllKitchenProducts} />
      ))}
    </div>
  );
}

export default ViewKitchenProducts;
