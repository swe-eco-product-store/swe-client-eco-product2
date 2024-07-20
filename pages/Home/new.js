// import React, { useState } from 'react';
import React from 'react';
import { Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../../utils/context/authContext';

function Home() {
  // const [value, setValue] = useState(0);
  const { user } = useAuth();
  const router = useRouter();
  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <div className="Button">
      <h1>Hello {user.displayName}</h1>
      <h2>SELECT A CATEGORY</h2>
      <Button onClick={() => navigateTo('/Bath/new')}>Bath</Button>
      <Button onClick={() => navigateTo('pets/new')}>Pets</Button>
      <Button onClick={() => navigateTo('kitchen/new')}>Kitchen</Button>
      <Button onClick={() => navigateTo('viewCart/new')}>VIew Cart</Button>
    </div>
  );
}
export default Home;
