import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Button } from 'react-bootstrap';
import { getBathProducts } from '../api/productsData';
import ProductCard from '../components/ProductCard';
import SearchBar from '../components/SearchBar';

function ViewBathProducts() {
  const [bathProducts, setBathProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const router = useRouter();

  const fetchBathProducts = () => {
    getBathProducts()
      .then((data) => {
        setBathProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching bath products:', error);
      });
  };

  useEffect(() => {
    fetchBathProducts();
  }, []);

  const handleSearch = (category, query) => {
    const lowercasedQuery = query.toLowerCase();
    const filtered = bathProducts.filter((product) => {
      const categoryName = product.category?.name?.toLowerCase() || '';
      const productName = product.name?.toLowerCase() || '';
      const productDescription = product.description?.toLowerCase() || '';
      const matchesCategory = category ? categoryName === category.toLowerCase() : true;
      const matchesQuery = productName.includes(lowercasedQuery) || productDescription.includes(lowercasedQuery);
      return matchesCategory && matchesQuery;
    });
    setFilteredProducts(filtered);
  };

  const handleAddProduct = () => {
    router.push('/newProducts');
  };

  return (
    <div className="container">
      <div className="Button text-center my-4">
        <Button variant="primary" onClick={handleAddProduct}>Add A Product</Button>
      </div>
      <SearchBar category="Bath" onSearch={handleSearch} />
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-4">
        {filteredProducts.map((product) => (
          <div className="col" key={product.id}>
            <ProductCard Obj={product} onUpdate={fetchBathProducts} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ViewBathProducts;
