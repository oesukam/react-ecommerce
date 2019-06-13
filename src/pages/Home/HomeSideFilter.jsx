import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import './HomeSideFilter.scss';
import closeSmallIcon from '../../assets/icons/icons-close-small-black.png';

const filterCategories = categories =>
  categories.map(cat => (
    <li key={cat.category_id} className="selected-category">
      <img src={closeSmallIcon} alt="Close icon" />
      {cat.name}
    </li>
  ));

const allCategories = categories =>
  categories.map(cat => (
    <li key={cat.category_id} className="check-category">
      <input type="checkbox" className="checkbox" />
      {cat.name}
    </li>
  ));

export const HomeSideFilter = ({ categories }) => (
  <div className="side-filter">
    <div className="filter-header">
      <h1>Filter 5000 Items</h1>
      <ul>{filterCategories(categories)}</ul>
    </div>
    <div className="filters">
      <h2>Color</h2>
      <div>
        <span className="color-box bg-blue selected" />
        <span className="color-box bg-cyan" />
        <span className="color-box bg-red" />
        <span className="color-box bg-orange" />
        <span className="color-box bg-yellow" />
        <span className="color-box bg-green" />
        <span className="color-box bg-purple" />
      </div>

      <h2>Size</h2>
      <div className="size-blocks">
        <div className="size-block">XS</div>
        <div className="size-block selected">S</div>
        <div className="size-block">M</div>
        <div className="size-block">L</div>
        <div className="size-block">XL</div>
      </div>

      <h2>Categories</h2>
      <ul className="categories-blocks">{allCategories(categories)}</ul>
    </div>
  </div>
);

HomeSideFilter.propTypes = {
  categories: propTypes.array,
  departmentId: propTypes.string,
};

HomeSideFilter.defaultProps = {
  categories: [],
  departmentId: '',
};

export const mapStateToProps = ({ item: { categories, departmentId } }) => ({
  categories,
  departmentId,
});

export default connect(mapStateToProps)(HomeSideFilter);
