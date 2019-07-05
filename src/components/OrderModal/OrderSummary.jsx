import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentUserField } from '../../actions/currentUserActions';

export class OrderDelivery extends Component {
  _onSelectRegion = ({ target }) => {
    const { _handleUserInput, regions } = this.props;
    const regiondId = parseInt(target.value, 10);
    const region =
      regions.find(reg => reg.shipping_region_id === regiondId) || {};
    _handleUserInput({
      target: { name: 'region', value: region.shipping_region },
    });
    _handleUserInput({
      target: { name: 'shipping_region_id', value: region.shipping_region_id },
    });
  };

  render = () => {
    const { cartProducts, user, cartTotalAmount } = this.props;
    return (
      <div className="columns">
        <div className="column is-8">
          <h4 className="title is-4">Order Summary</h4>
          <table className="table is-fullwidth">
            <thead>
              <tr>
                <th>Item</th>
                <th width="40">Qty</th>
                <th width="150" className="has-text-centered">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {cartProducts.map(item => (
                <tr key={item.item_id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td className="title is-5 color-red has-text-centered">
                    ${item.price}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td><h5 className="title is-5">Total</h5></td>
                <td colSpan="2">
                  <h5 className="title is-5 has-text-right color-red">${cartTotalAmount}</h5>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
        <div className="column is-4">
          <h4 className="title is-4">Delivery</h4>
          <h5 className="title is-5 color-gray">Address</h5>
          <p className="color-gray">{user.address_1}</p>
        </div>
      </div>
    );
  };
}

OrderDelivery.propTypes = {
  orders: propTypes.array,
};

OrderDelivery.defaultProps = {
  orders: [],
};

export const mapStateToProps = ({
  currentUser: { userError, user },
  order: {
    orders,
    orderForm: { cart_id: cartId },
    orderStep,
    orderSteps,
    submittingOrder,
  },
  shipping: { regions, region },
  cart: { cartProducts, cartTotalAmount  },
}) => ({
  orders,
  cartId,
  orderStep,
  orderSteps,
  submittingOrder,
  userError,
  user,
  regions,
  region,
  cartProducts,
  cartTotalAmount
});

export const mapDispatchToProps = dispatch => ({
  _handleUserInput: ({ target: { value, name } }) =>
    dispatch(setCurrentUserField({ name, value })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDelivery);
