import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { client } from '../../client';
import image from '../../assets/pizza.jpg';
import { BsArrowDownCircle } from 'react-icons/bs';

function Dessert() {
  const [dessertMenu, setDessertMenu] = useState([]);

  const cleanUpDessertMenu = (rawData) => {
    const cleanDessertMenu = rawData.map((data) => {
      const { sys, fields } = data;
      const { id } = sys;
      const { title, description, category, item, price } = fields;
      return { id, title, item, category, description, price };
    });
    setDessertMenu(cleanDessertMenu);
  };

  const getDessertMenu = async () => {
    try {
      const response = await client.getEntries({
        content_type: 'menu',
        limit: 1000,
      });
      const responseData = response.items;
      cleanUpDessertMenu(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDessertMenu();
  }, []);


  const renderDessertInSection = (category) => {
  // Filter and sort dessert items for the given category.
  const sortedDessertItems = dessertMenu
    .filter((dessert) => dessert.category === category)
    .sort((a, b) => a.price - b.price);

  return sortedDessertItems.map((dessert) => (
    <div key={dessert.id} className='item'>
      <div className='descriptionDiv'>
        <h3 className='sectionItem'>{dessert.item}</h3>
        <p className='itemDescription'>{dessert.description}</p>
      </div>
      {dessert.price !== undefined && (
        <span className='price'>&#8358; {dessert.price}</span>
      )}
    </div>
  ));
};


  const ScrollToTopButton = () => {
    return (
      <Link to='top' smooth={true} duration={100}>
        <BsArrowDownCircle size={25} />
      </Link>
    );
  };

  const sections = [
    'Pastry',
    'Pizza',
    'Finger Food',
    'Shawarma',
    'Grill',
    'Specials',
  ];

  return (
    <>
      <img src={image} alt='pizza' className='banner-image' />
      <main className='background'>
        {sections.map((category) => (
          <section key={category}>
            <h2 className='sectionHeading'>{category}</h2>
            {renderDessertInSection(category).reverse()}
          </section>
        ))}
        <div className='scroll'>
          <ScrollToTopButton />
        </div>
      </main>
    </>
  );
}

export default Dessert;

