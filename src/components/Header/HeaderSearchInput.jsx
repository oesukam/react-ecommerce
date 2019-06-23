import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import searchIcon from '../../assets/icons/icons-search-white.png';
import './HeaderSearchInput.scss';
import { searchProducts, setSearchedItems } from '../../actions/itemActions';
import { Link } from 'react-router-dom';

const WAIT_INTERVAL = 1000; // In milliseconds
const ENTER_KEY = 13; // Enter keyboard press number

export class HeaderSearchInput extends Component {
  state = {
    value: '',
    typing: false
  };

  componentDidMount() {
    this.props._setSearchedItems([]);
  }

  timer = null;

  clearInput = () => {
    this.setState({ value: ''});
    this.props._setSearchedItems([])
  }

  handleChange = (e) => {
    clearTimeout(this.timer);
    this.setState({ value: e.target.value });
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  };

  handleKeyDown = (e) => {
    this.setState({ typing: true })
    if (e.keyCode === ENTER_KEY) {
      clearTimeout(this.timer);
      this.setState({ value: e.target.value }, () => this.triggerChange());
      e.preventDefault();
    }
  };

  triggerChange = () => {
    const { value } = this.state;
    this.setState({ typing: false })
    if(value) { 
      this.props._searchProducts(value);
      return
    }
    this.props._setSearchedItems([])
  };

  render() {
    const { value, typing } = this.state;
    const { searchingItems, searchedItems } = this.props;
    return (
      <div className="nav-search">
        <img
          src={searchIcon}
          className="nav-search__loop"
          alt="Search loop icon"
        />
        <input
          type='text'
          className="nav-search__input"
          value={value}
          placeholder="search anything"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <button
          className={`nav-search__close ${typing || searchingItems ? 'loading': ''}`}
          onClick={this.clearInput}
        >
          <i 
            className="fa fa-times color-white"
            alt="Search close icon"
          />
        </button>
        {
          value ?
          (<div className="search-items">
            <ul>
              { searchedItems.map((item) => (
              <li className="search-items__item">
                <Link to={`/products/${item.product_id}`}>{item.name}</Link>
              </li>
              ))
              }
            </ul>
          </div>
          ): null
        }
        </div>
    );
  }
}

HeaderSearchInput.propTypes = {
  searchingItems: propTypes.bool.isRequired,
  searchedItems: propTypes.array.isRequired,
  _searchProducts: propTypes.func.isRequired,
  _setSearchedItems: propTypes.func.isRequired,
};

export const mapStateToProps = ({ item: {
  searchingItems,
  searchedItems,
}}) => ({
  searchingItems,
  searchedItems,
});

export const mapDispatchToProps = (dispatch) => ({
  _searchProducts: (payload) => dispatch(searchProducts(payload)),
  _setSearchedItems: (payload) => dispatch(setSearchedItems(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearchInput);