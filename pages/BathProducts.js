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
    <div className="container">
      <div className="Button text-center my-4">
        <Button variant="primary" onClick={handleAddProduct}>Add A Product</Button>
      </div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {bathProducts.map((product) => (
          <div className="col" key={product.id}>
            <ProductCard Obj={product} onUpdate={getAllBathProducts} />
          </div>
        ))}
      </div>

    </div>
  );
}

export default ViewBathProducts;
