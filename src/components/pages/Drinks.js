import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { client } from '../../client';
import image from '../../assets/drinks.jpg';
import { BsArrowDownCircle } from 'react-icons/bs';

function Drinks() {
  const [drinksMenu, setDrinksMenu] = useState([]);

  const cleanUpDrinksMenu = (rawData) => {
    const cleanDrinksMenu = rawData.map((data) => {
      const { sys, fields } = data;
      const { id } = sys;
      const { title, description, category, item, price } = fields;
      return { id, title, item, category, description, price };
    });
    setDrinksMenu(cleanDrinksMenu);
  };

  const getDrinksMenu = async () => {
    try {
      const response = await client.getEntries({
        content_type: 'menu',
        limit: 1000,
      });
      const responseData = response.items;
      cleanUpDrinksMenu(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDrinksMenu();
  }, []);

  const renderDrinksInSection= (category) => {
  // Filter and sort dessert items for the given category.
  const sortedDrinksItems = drinksMenu
    .filter((drink) => drink.category === category)
    .sort((a, b) => a.price - b.price);

  return sortedDrinksItems.map((drink) => (
    <div key={drink.id} className='item'>
      <div className='descriptionDiv'>
        <h3 className='sectionItem'>{drink.item}</h3>
        <p className='itemDescription'>{drink.description}</p>
      </div>
      {drink.price !== undefined && (
        <span className='price'>&#8358; {drink.price}</span>
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
    'Water',
    'Tea/coffee',
    'Soda',
    'Milkshake',
    'Smoothies',
    'Packaged Juice',
    'White Wine',
    'Red Wine',
    'Non Alcoholic Wine',
    'Rose',
    'Liquor',
    'Vodka',
    'Rum',
    'Gin',
    'Energy Drinks',
    'Shots',
    'Mocktails',
    'Cocktails',
    'Beer',
    'Extras Drinks',
  ];

  return (
    <>
      <img src={image} alt='three cocktail drinks' className='banner-image' />
      <main className='background'>
        {sections.map((category) => (
          <section key={category}>
            <h2 className='sectionHeading'>{category}</h2>
            {renderDrinksInSection(category).reverse()}
          </section>
        ))}
        <div className='scroll'>
          <ScrollToTopButton />
        </div>
      </main>
    </>
  );
}

export default Drinks;
