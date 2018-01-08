import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

const CategoryNav = ({ categories, path }) => (
  <nav className='categories'>
    <h3>Categories</h3>
    {Object.keys(categories).map(name => {
      const link = `/${categories[name].path}`;
      return (
        <Link
          className={classnames('category-link', {
            active: path.indexOf(link) > -1,
          })}
          to={link} >
          {name}
        </Link>
      )
    })}
  </nav>
);

export default CategoryNav;