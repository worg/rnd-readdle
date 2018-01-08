import React from 'react';
import { Link } from 'react-router-dom';

const CategoryNav = ({ categories }) => (
  <nav className='categories'>
    {Object.keys(categories).map(name => (
      <Link
        className='category-link'
        to={`/${categories[name].path}`} >
        {name}
      </Link>
    ))}
  </nav>
);

export default CategoryNav;