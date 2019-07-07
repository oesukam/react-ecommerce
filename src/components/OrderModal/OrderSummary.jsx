import React from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

export const OrderSummary = ({ cartProducts, user, cartTotalAmount }) =>
  (
    <div className="columns">
      <div className="column is-8">
        <h4 className="title is-4">Order Summary</h4>
        <table className="table is-fullwidth">
          <thead>
            <tr>
              <th>Item</th>
              <th width="40">Size</th>
              <th width="40">Color</th>
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
                <td className="has-text-centered">
                  {item.attributes.split(',')[0] || '-'}
                </td>
                <td className="has-text-centered">
                  {item.attributes.split(',')[1] || '-'}
                </td>
                <td>{item.quantity}</td>
                <td className="title is-5 color-red has-text-centered">
                  ${item.price}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="4"><h5 className="title is-5">Total</h5></td>
              <td>
                <h5 className="title is-5 has-text-centered color-red">${cartTotalAmount}</h5>
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

OrderSummary.propTypes = {
  user: propTypes.object.isRequired,
  cartProducts: propTypes.array.isRequired,
  cartTotalAmount: propTypes.oneOfType([
    propTypes.number.isRequired,
    propTypes.string.isRequired,
  ])
};


export const mapStateToProps = ({
  currentUser: { user },
  cart: { cartProducts, cartTotalAmount  },
}) => ({
  user,
  cartProducts,
  cartTotalAmount
});


export default connect(
  mapStateToProps,
)(OrderSummary);
