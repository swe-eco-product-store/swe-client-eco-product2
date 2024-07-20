// import React, { useState } from 'react';
import React from 'react';
import { Button } from 'react-bootstrap';
import Link from 'next/link';

function Home() {
  // const [value, setValue] = useState(0);

  const handleClick = () => {
    <Link passHref href="/Bath/new" />;
    console.log('hello');
  };
  return (
    <div className="Button">
      <h2>SELECT A CATEGORY</h2>
      <Button onClick={handleClick}>Bath</Button>
      <Button>Pets</Button>
      <Button>Kitchen</Button>
      <Button>VIew Cart</Button>
    </div>
  );
}
export default Home;
