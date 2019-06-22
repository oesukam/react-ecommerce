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
    const { userError, _handleUserInput, user, regions } = this.props;
    return (
      <form>
        <p className="help is-danger">
          {userError.field === '' && userError.message ? userError.message : ''}
        </p>
        <div className="columns">
          <div className="column">
            <div className="field">
              <div className="control">
                <label className="label">
                  Names <span className="color-red">*</span>
                </label>
                <input
                  name="name"
                  onChange={_handleUserInput}
                  className={`input ${!user.name ? 'is-danger' : ''}`}
                  type="text"
                  placeholder="Names"
                  value={user.name}
                  required
                />
              </div>
              <p className="help is-danger">
                {userError.field === 'name' ? userError.message : ''}
              </p>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <div className="control">
                <label className="label">
                  Country <span className="color-red">*</span>
                </label>
                <input
                  name="country"
                  onChange={_handleUserInput}
                  className={`input ${!user.country ? 'is-danger' : ''}`}
                  type="text"
                  placeholder="Country"
                  value={user.country || ''}
                  required
                />
              </div>
              <p className="help is-danger">
                {userError.field === 'country' ? userError.message : ''}
              </p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <div className="control">
                <label className="label">State</label>
                <input
                  name="state"
                  onChange={_handleUserInput}
                  className="input"
                  type="text"
                  placeholder="State"
                  value={user.state || ''}
                  required
                />
              </div>
              <p className="help is-danger">
                {userError.field === 'state' ? userError.message : ''}
              </p>
            </div>
          </div>

          <div className="column">
            <div className="field">
              <div className="control">
                <label className="label">City</label>
                <input
                  name="city"
                  onChange={_handleUserInput}
                  className={`input ${!user.city ? 'is-danger' : ''}`}
                  type="text"
                  placeholder="City"
                  value={user.city || ''}
                  required
                />
              </div>
              <p className="help is-danger">
                {userError.field === 'city' ? userError.message : ''}
              </p>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <div className="field">
              <div className="control">
                <label className="label">Region</label>
                <div className={`select ${!user.region ? 'is-danger' : ''}`}>
                  <select
                    value={user.shipping_region_id}
                    onChange={this._onSelectRegion}
                  >
                    <option value="">Select Region</option>
                    {regions.map(reg =>
                      reg.shipping_region !== 'Please Select' ? (
                        <option
                          data-region-name={reg.shipping_region}
                          value={reg.shipping_region_id}
                          key={reg.shipping_region_id}
                        >
                          {reg.shipping_region}
                        </option>
                      ) : null,
                    )}
                  </select>
                </div>
              </div>
              <p className="help is-danger">
                {userError.field === 'region' ||
                userError.field === 'shipping_region_id'
                  ? userError.message
                  : ''}
              </p>
            </div>
          </div>

          <div className="column">
            <div className="field">
              <label className="label">
                Postal Code <span className="color-red">*</span>
              </label>
              <div className="control">
                <input
                  name="postal_code"
                  onChange={_handleUserInput}
                  className={`input ${!user.postal_code ? 'is-danger' : ''}`}
                  type="text"
                  placeholder="Postal Code"
                  value={user.postal_code || ''}
                  required
                />
              </div>
              <p className="help is-danger">
                {userError.field === 'postal_code' ? userError.message : ''}
              </p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <div className="control">
                <label className="label">
                  Address <span className="color-red">*</span>
                </label>
                <textarea
                  row="5"
                  name="address_1"
                  onChange={_handleUserInput}
                  className={`textarea ${!user.address_1 ? 'is-danger' : ''}`}
                  type="text"
                  placeholder="Address 1"
                  value={user.address_1 || ''}
                  required
                />
              </div>
              <p className="help is-danger">
                {userError.field === 'address_1' ? userError.message : ''}
              </p>
            </div>
          </div>
        </div>
      </form>
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
  cart: { cartProducts },
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
});

export const mapDispatchToProps = dispatch => ({
  _handleUserInput: ({ target: { value, name } }) =>
    dispatch(setCurrentUserField({ name, value })),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OrderDelivery);
