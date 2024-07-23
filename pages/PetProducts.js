import React, { useEffect, useState } from 'react';
import { getPetProducts } from '../api/productsData';
import ProductCard from '../components/ProductCard';

function ViewPetProducts() {
  const [petProducts, setPetProducts] = useState([]);

  const getAllPetProducts = () => {
    getPetProducts()
      .then((data) => {
        setPetProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching pet products:', error);
      });
  };

  useEffect(() => {
    getAllPetProducts();
  }, []);

  return (
    <div>
      {petProducts.map((product) => (
        <ProductCard key={product.id} Obj={product} onUpdate={getAllPetProducts} />
      ))}
    </div>
  );
}

export default ViewPetProducts;
