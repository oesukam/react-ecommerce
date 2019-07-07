import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import './HomeSideFilter.scss';
import closeSmallIcon from '../../assets/icons/icons-close-small-black.png';
import { setCategoryId, fetchItems } from '../../actions/itemActions';

export class HomeSideFilter extends Component {
  clearFilter = () => {
    const { _setCategoryId, _fetchItems } = this.props;
    _setCategoryId('');
    _fetchItems();
  };

  filterByCategory = categoryId => {
    const {
      _setCategoryId,
      _fetchItems,
      history,
      meta: { page },
      departmentId,
    } = this.props;
    let url = `/?page=${page}&category=${categoryId}`;
    if (departmentId) {
      url = `/departments/${departmentId}${url}`;
    }
    _setCategoryId(categoryId);
    history.push(url);
    _fetchItems({ categoryId, type: 'category' });
  };

  renderFilterCategories = () => {
    const { categories, categoryId } = this.props;
    return categories.map(cat =>
      cat.category_id === categoryId ? (
        <li key={cat.category_id} className="selected-category">
          <img
            className="clear-filter-btn"
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
            className="filter-category-input"
            type="radio"
            name="categoryId"
            checked={categoryId === cat.category_id}
            value={cat.category_id}
            onChange={() =>
              this.filterByCategory(cat.category_id, cat.department_id)
            }
          />
          <label
            className="filter-category-label"
            onClick={() =>
              this.filterByCategory(cat.category_id, cat.department_id)
            }
          >
            {cat.name}
          </label>
        </li>
      ) : null,
    );
  };

  render() {
    const {
      meta: { total },
      loadingItems,
    } = this.props;
    return (
      <div className="side-filter">
        <div className="filter-header">
          <h1>Filter {!loadingItems ? total : ''} Items</h1>
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
  categories: propTypes.array.isRequired,
  departmentId: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
  categoryId: propTypes.oneOfType([propTypes.number, propTypes.string]).isRequired,
  meta: propTypes.object.isRequired,
  loadingItems: propTypes.bool.isRequired,
  _setCategoryId: propTypes.func.isRequired,
  _fetchItems: propTypes.func.isRequired,
};

export const mapStateToProps = ({
  item: { categories, departmentId, categoryId, meta, loadingItems },
}) => ({
  categories,
  departmentId,
  categoryId,
  meta,
  loadingItems,
});

export const mapDispatchToProps = dispatch => ({
  _setCategoryId: categoryId => dispatch(setCategoryId(categoryId)),
  _fetchItems: paylaod => dispatch(fetchItems(paylaod)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeSideFilter);
