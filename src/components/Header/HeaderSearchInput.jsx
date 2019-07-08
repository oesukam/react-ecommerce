import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import searchIcon from '../../assets/icons/icons-search-white.png';
import './HeaderSearchInput.scss';
import {
  searchProducts,
  setSearchedItems,
  setSearchKeywords,
  searchProductsRecommendation,
} from '../../actions/itemActions';


const WAIT_INTERVAL = 3000; // In milliseconds
const ENTER_KEY = 13; // Enter keyboard press number

export class HeaderSearchInput extends Component {
  state = {
    typing: false,
    dropdown: false,
    items: [],
    stoppedFetch: false,
  };

  componentDidMount() {
    this.props._setSearchedItems({ rows: [] });
  }

  timer = null;

  clearInput = () => {
    const { history } = this.props;
    this.props._setSearchKeywords('');
    this.setState({
      typing: false,
      dropdown: false,
      items: [],
      stoppedFetch: false,
    })
    history.push('/products?search=');
  }

  handleChange = (e) => {
    clearTimeout(this.timer);
    this.props._setSearchKeywords(e.target.value);
    this.timer = setTimeout(this.triggerChange, WAIT_INTERVAL);
  };

  handleKeyDown = (e) => {
    const { history } = this.props;
    const { target: { value: searchKeywords } } = e;
    this.setState({ typing: true });
    this.loadRecommendation(searchKeywords);
    if (e.keyCode === ENTER_KEY) {
      clearTimeout(this.timer);
      this.props._setSearchKeywords(searchKeywords);
      history.push(`/products?page=1&search=${searchKeywords}`);
      this.props._searchProducts({ searchKeywords });
      this.setState({
        dropdown: false,
        typing: false,
        stoppedFetch: true,
      })
      e.preventDefault();
    }
  };

  triggerChange = () => {
    this.setState({ typing: false })
  };

  loadRecommendation = (keywords) => {
    if (keywords.length > 3) {
      this.props._searchProductsRecommendation(keywords)
      .then((items) => {
        if (!this.state.stoppedFetch) {
          this.setState({
            items,
            dropdown: items.length !== 0,
          });
        }
      })
    }
  }

  closeDropDown = (searchKeywords) => {
    this.setState({
      dropdown: false
    });
    this.props._setSearchKeywords(searchKeywords);
    this.props._searchProducts({searchKeywords });
  }

  render() {
    const { typing, dropdown, items } = this.state;
    const {  searchKeywords } = this.props;
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
          value={searchKeywords}
          placeholder="search anything"
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
        <button
          data-test="clear-search-input"
          className={`nav-search__close ${typing ? 'loading': ''}`}
          onClick={this.clearInput}
        >
          <i 
            className="fa fa-times color-white"
            alt="Search close icon"
          />
        </button>
        {
          searchKeywords && dropdown ?
          (<div className="search-items">
            <ul>
              { items.map((item) => (
              <li onClick={() => this.closeDropDown(item.name)} key={item.product_id} className="search-items__item">
                <Link to={`/products?page=1&search=${item.name}`}>{item.name}</Link>
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
  _setSearchKeywords: propTypes.func.isRequired,
};

export const mapStateToProps = ({ item: {
  searchingItems,
  searchedItems,
  searchKeywords,
}}) => ({
  searchingItems,
  searchedItems,
  searchKeywords
});

export const mapDispatchToProps = (dispatch) => ({
  _searchProducts: (payload) => dispatch(searchProducts(payload)),
  _setSearchedItems: (payload) => dispatch(setSearchedItems(payload)),
  _setSearchKeywords: (payload) => dispatch(setSearchKeywords(payload)),
  _searchProductsRecommendation: (payload) => dispatch(searchProductsRecommendation(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSearchInput);