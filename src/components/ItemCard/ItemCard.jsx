import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './ItemCard.scss';

const ItemCard = ({ item, addToCart }) => (
  <div className="item-card">
    <img
      src={`/product_images/${item.thumbnail}`}
      className="item-card__image"
      alt="Item thumbnail"
    />
    <div className="item-card__name">{item.name}</div>
    <div className="item-card__bottom">
      <button
        data-test="buy-btn"
        className={`item-card__bottom__buy-btn ${item.adding ? 'loading' : ''}`}
        onClick={() => addToCart(item.product_id, item)}
      >
        Buy now
      </button>
    </div>
    <div className="item-card__hover">
      <Link
        to={`/products/${item.product_id}`}
        className="item-card__hover__view-btn"
      >
        View Product
      </Link>
    </div>
  </div>
);

ItemCard.propTypes = {
  item: propTypes.object,
  addToCart: propTypes.func,
};

ItemCard.defaultProps = {
  item: {},
  addToCart: () => '',
};

export default ItemCard;
