import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import './HomeSideFilter.scss';
import closeSmallIcon from '../../assets/icons/icons-close-small-black.png';
import { setCategoryId, fetchItems } from '../../actions/itemActions';

export class HomeSideFilter extends Component {
  clearFilter = () => {
    const { categoryChange, getItems } = this.props;
    categoryChange('');
    getItems();
  };

  filterByCategory = categoryId => {
    const { categoryChange, getItems } = this.props;
    categoryChange(categoryId);
    getItems({ categoryId, type: 'category' });
  };

  renderFilterCategories = () => {
    const { categories, categoryId } = this.props;
    return categories.map(cat =>
      cat.category_id === categoryId ? (
        <li key={cat.category_id} className="selected-category">
          <img
            src={closeSmallIcon}
            onClick={this.clearFilter}
            alt="Close icon"
          />
          {cat.name}
        </li>
      ) : null,
    );
  };

  renderCategories = () => {
    const { categories, departmentId, categoryId } = this.props;
    return categories.map(cat =>
      !departmentId || departmentId === cat.department_id ? (
        <li key={cat.category_id} className="radio-category">
          <input
            type="radio"
            name="categoryId"
            checked={categoryId === cat.category_id}
            value={cat.category_id}
            onChange={() => this.filterByCategory(cat.category_id)}
          />
          <label onClick={() => this.filterByCategory(cat.category_id)}>
            {cat.name}
          </label>
        </li>
      ) : null,
    );
  };

  render() {
    const { itemsCount } = this.props;
    return (
      <div className="side-filter">
        <div className="filter-header">
          <h1>Filter {itemsCount} Items</h1>
          <ul>{this.renderFilterCategories()}</ul>
        </div>
        <div className="filters">
          <h2>Categories</h2>
          <ul className="categories-blocks">{this.renderCategories()}</ul>
        </div>
      </div>
    );
  }
}

HomeSideFilter.propTypes = {
  categories: propTypes.array,
  departmentId: propTypes.oneOfType([propTypes.number, propTypes.string]),
  categoryId: propTypes.oneOfType([propTypes.number, propTypes.string]),
  itemsCount: propTypes.number,
  categoryChange: propTypes.func,
  getItems: propTypes.func,
};

HomeSideFilter.defaultProps = {
  categories: [],
  departmentId: '',
  categoryId: '',
  itemsCount: 0,
  categoryChange: () => '',
  getItems: () => '',
};

export const mapStateToProps = ({
  item: { categories, departmentId, categoryId },
}) => ({
  categories,
  departmentId,
  categoryId,
});

export const mapDispatchToProps = dispatch => ({
  categoryChange: categoryId => dispatch(setCategoryId(categoryId)),
  getItems: paylaod => dispatch(fetchItems(paylaod)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeSideFilter);
