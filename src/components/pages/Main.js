import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { client } from '../../client';
import image from '../../assets/pasta.jpg';
import { BsArrowDownCircle } from 'react-icons/bs';

function Main() {
  const [mainMenu, setMainMenu] = useState([]);

  const cleanUpMainMenu = (rawData) => {
    const cleanMainMenu = rawData.map((data) => {
      const { sys, fields } = data;
      const { id } = sys;
      const { title, description, category, item, price } = fields;
      return { id, title, item, category, description, price };
    });
    setMainMenu(cleanMainMenu);
  };

  const getMainMenu = async () => {
    try {
      const response = await client.getEntries({
        content_type: 'menu',
        limit: 1000,
      });
      const responseData = response.items;
      cleanUpMainMenu(responseData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMainMenu();
  }, []);

  // const renderMainInSection = (category) => {
  //   return mainMenu.map((main) => {
  //     if (main.category === category) {
  //       return (
  //         <div key={main.id} className='item'>
  //           <div className='descriptionDiv'>
  //             <h3 className='sectionItem'>{main.item}</h3>
  //             <p className='itemDescription'>{main.description}</p>
  //           </div>
  //           <span className='price'> &#8358; {main.price}</span>
  //         </div>
  //       );
  //     } else {
  //       return null;
  //     }
  //   });
  // };

   const renderMainInSection = (category) => {
  // Filter and sort dessert items for the given category.
  const sortedMainItems = mainMenu
    .filter((main) => main.category === category)
    .sort((a, b) => a.price - b.price);

  return sortedMainItems.map((main) => (
    <div key={main.id} className='item'>
      <div className='descriptionDiv'>
        <h3 className='sectionItem'>{main.item}</h3>
        <p className='itemDescription'>{main.description}</p>
      </div>
      {main.price !== undefined && (
        <span className='price'>&#8358; {main.price}</span>
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

  return (
    <>
      <img src={image} alt='plate of pasta' className='banner-image' />
      <main className='background'>
        {[
          'Breakfast',
          'Starter',
          'Peppersoup',
          'Salad',
          'Rice',
          'Pasta',
          'Swallow',
          'French Fries',
          'Chicken',
          'Beef',
          'Fish',
          'Seafood',
          'Vegeterian',
          'Extrasmain',
        ].map((category) => (
          <section key={category}>
            <h2 className='sectionHeading'>{category}</h2>
            {renderMainInSection(category).reverse()}
          </section>
        ))}
        <div className='scroll'>
          <ScrollToTopButton />
        </div>
      </main>
    </>
  );
}

export default Main;
