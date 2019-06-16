import React, { Component } from 'react';
import propTypes from 'prop-types';
import './Quantity.scss';

class Quantity extends Component {
  state = {
    adding: false,
    substracting: false,
  };

  _onQuantityChange = (quantity, onQuantityChange, type = 'adding') => {
    const value = quantity < 1 ? 1 : quantity;
    onQuantityChange(value);
  };

  render() {
    const { onQuantityChange, quantity } = this.props;
    return (
      <div className="product-quantity">
        <button
          className="product-quantity--icon"
          onClick={() =>
            this._onQuantityChange(
              quantity - 1,
              onQuantityChange,
              'substracting',
            )
          }
        >
          <i className="fa fa-minus" />
        </button>
        <span className="product-quantity--count">{quantity}</span>
        <button
          className="product-quantity--icon"
          onClick={() =>
            this._onQuantityChange(
              quantity + 1,
              onQuantityChange,
              'substracting',
            )
          }
        >
          <i className="fa fa-plus" />
        </button>
      </div>
    );
  }
}

Quantity.propTypes = {
  quantity: propTypes.number,
  onQuantityChange: propTypes.func,
};

Quantity.defaultProps = {
  quantity: 1,
  onQuantityChange: () => '',
};

export default Quantity;
