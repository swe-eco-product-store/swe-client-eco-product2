import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getBathProducts } from '../api/productsData';
import ProductCard from '../components/ProductCard';

function ViewBathProducts() {
  const [bathProducts, setBathProducts] = useState([]);
  const router = useRouter();

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

  const handleAddProduct = () => {
    router.push('/newProducts');
  };

  return (
    <div>
      <div className="Button text-center my-4">
        <Button variant="primary" onClick={handleAddProduct}>Add A Product</Button>
      </div>
      {bathProducts.map((product) => (
        <ProductCard key={product.id} Obj={product} onUpdate={getAllBathProducts} />
      ))}
    </div>
  );
}

export default ViewBathProducts;
