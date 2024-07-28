import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getKitchenProducts } from '../api/productsData';
import ProductCard from '../components/ProductCard';

function ViewKitchenProducts() {
  const [kitchenProducts, setKitchenProducts] = useState([]);
  const router = useRouter();

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

  const handleAddProduct = () => {
    router.push('/newProducts');
  };

  return (
    <div>
      <div className="Button text-center my-4">
        <Button variant="primary" onClick={handleAddProduct}>Add A Product</Button>
      </div>
      {kitchenProducts.map((product) => (
        <ProductCard key={product.id} Obj={product} onUpdate={getAllKitchenProducts} />
      ))}
    </div>
  );
}

export default ViewKitchenProducts;
