import React, { useEffect, useState } from 'react';
import { getBathProducts } from '../api/productsData';
import ProductCard from '../components/ProductCard';

function ViewBathProducts() {
  const [bathProducts, setBathProducts] = useState([]);

  const getAllBathProducts = () => {
    getBathProducts()
      .then((data) => {
        setBathProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching bath products:', error);
      });
  };

  useEffect(() => {
    getAllBathProducts();
  }, []);

  return (
    <div>
      {bathProducts.map((product) => (
        <ProductCard key={product.id} Obj={product} onUpdate={getAllBathProducts} />
      ))}
    </div>
  );
}

export default ViewBathProducts;
