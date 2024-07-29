import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import ProductCard from '../../components/ProductCard';
import { getPetProducts } from '../../api/productsData';

function Home() {
  const [pets, setPets] = useState([]);
  const router = useRouter();

  const getAllPets = () => {
    getPetProducts().then((data) => setPets(data));
  };

  useEffect(() => {
    getAllPets();
  }, []);

  return (
    <>
      <article className="pets">
        <h1>pets</h1>
        {pets.map((pet) => (
          <section key={`pet--${pet.id}`} className="pet">
            <ProductCard
              name={pet.name}
              price={pet.price}
              product_image={pet.product_image}
              id={pet.id}
              onUpdate={getAllPets}
            />
          </section>
        ))}
      </article>
      <>
        <Button onClick={() => { router.push('/pets/new'); }}>
          Add New Pet Product
        </Button>
      </>
    </>
  );
}

export default Home;
