import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getPetProducts } from '../api/productsData';
import ProductCard from '../components/ProductCard';

function ViewPetProducts() {
  const [petProducts, setPetProducts] = useState([]);
  const router = useRouter();

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

  const handleAddProduct = () => {
    router.push('/newProducts');
  };

  return (
    <div className="container">
      <div className="Button text-center my-4">
        <Button variant="primary" onClick={handleAddProduct}>Add A Product</Button>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {petProducts.map((product) => (
          <div className="col" key={product.id}>
            <ProductCard Obj={product} onUpdate={getAllPetProducts} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewPetProducts;
