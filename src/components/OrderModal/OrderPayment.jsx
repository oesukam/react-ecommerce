import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import visaCardIcon from '../../assets/icons/logos-visa.png';
import masterCardIcon from '../../assets/icons/logos-mastercard.png';
import './OrderPayment.scss';

export class OrderPayment extends Component {
  state = {
    validPeriod: '',
    validCreditCard: true,
  };

  shouldComponentUpdate() {
    return false;
  }

  componentDidMount() {
    this.props.card.mount('#cc-form');
  }

  render = () => {
    const { cartTotalAmount } = this.props;
    return (
      <form onSubmit={this._submitUser}>
        <div className="payment">
          <div className="payment__logo">
            <img src={visaCardIcon} alt="credit logo" />
            <img src={masterCardIcon} alt="credit logo" />
          </div>
          <h4 className="title is-4">
            Pay ${cartTotalAmount} with credit card
          </h4>
        </div>
        <br/>
        <div id="cc-form" />
        <br />
        <div className="columns">
          <div className="column">
            <p className="color-gray">
              * CVV or CVC is the card security code, unique three digits number
              on the back of your card separate from its number.
            </p>
          </div>
        </div>
      </form>
    );
  };
}

OrderPayment.propTypes = {
  cartTotalAmount: propTypes.oneOfType([
    propTypes.number.isRequired,
    propTypes.string.isRequired,
  ]),
  card: propTypes.any.isRequired
};

export const mapStateToProps = ({ cart: { cartTotalAmount } }) => ({
  cartTotalAmount,
});

export default connect(mapStateToProps)(OrderPayment);
