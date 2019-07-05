import React, { Component } from 'react';
import propTypes from 'prop-types';
import { connect } from 'react-redux';
import Notification from 'react-bulma-notification';
import './Settings.scss';
import Layout from '../../containers/Layout/Layout';
import {
  setCurrentUserField,
  submitUpdateUser,
  submitUpdateUserAddress,
  fetchCurrentUser,
} from '../../actions/currentUserActions';
import { fetchShippingRegions } from '../../actions/shippingActions';

export class Settings extends Component {
  state = {
    password: false,
    email: false,
    username: false,
  };

  componentDidMount() {
    this.props._fetchCurrentUser();
    this.props._fetchShippingRegions();
  }

  _submitUser = e => {
    e.preventDefault();
    const { user, _updateUser } = this.props;
    if (!user.email || !user.name) {
      return;
    }
    _updateUser({
      name: user.name || undefined,
      email: user.email || undefined,
      day_phone: user.day_phone,
      eve_phone: user.eve_phone,
      mob_phone: user.mob_phone,
      password: user.password || undefined,
    }).then((res) => {
      if (res && res.email) {
        Notification.success('Information updated', { duration: 3 })
      }
    })
  };

  _submitAddress = e => {
    e.preventDefault();
    const { _updateUserAddress, user } = this.props;
    if (
      !user.address_1 ||
      !user.city ||
      !user.region ||
      !user.postal_code ||
      !user.country ||
      !user.shipping_region_id
    ) {
      return;
    }
    _updateUserAddress({
      address_1: user.address_1,
      city: user.city,
      region: user.region,
      postal_code: user.postal_code,
      country: user.country,
      shipping_region_id: user.shipping_region_id,
    }).then((res) => {
      if (res && res.email) {
        Notification.success('Address updated', { duration: 3 })
      }
    })
  };

  _renderProfile = () => {
    const { userError, _handleInput, user, updatingUser } = this.props;
    return (
      <form onSubmit={this._submitUser}>
        <h1 className="title is-2">User Information</h1>
        <p className="help is-danger">
          {userError.field === '' && userError.message ? userError.message : ''}
        </p>
        <div className="columns">
          <div className="column">
            <div className="field">
              <div className="control">
                <label className="label">Names</label>
                <input
                  name="name"
                  onChange={_handleInput}
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
                <label className="label">Email</label>
                <input
                  name="email"
                  onChange={_handleInput}
                  className={`input ${!user.email ? 'is-danger' : ''}`}
                  type="email"
                  placeholder="Email"
                  value={user.email || ''}
                  required
                />
              </div>
              <p className="help is-danger">
                {userError.field === 'email' ? userError.message : ''}
              </p>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Mobile Phone Number</label>
              <div className="control">
                <input
                  name="mob_phone"
                  onChange={_handleInput}
                  className="input"
                  type="text"
                  placeholder="Mobile Phone Number"
                  value={user.mob_phone || ''}
                  required
                />
              </div>
              <p className="help is-danger">
                {userError.field === 'mob_phone' ? userError.message : ''}
              </p>
            </div>
          </div>

          <div className="column">
            <div className="field">
              <div className="control">
                <label className="label">Day phone</label>
                <input
                  name="day_phone"
                  onChange={_handleInput}
                  className="input"
                  type="text"
                  placeholder="Day phone number"
                  value={user.day_phone || ''}
                  required
                />
              </div>
              <p className="help is-danger">
                {userError.field === 'day_phone' ? userError.message : ''}
              </p>
            </div>
          </div>
        </div>

        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Even Phone Number</label>
              <div className="control">
                <input
                  name="eve_phone"
                  onChange={_handleInput}
                  className="input"
                  type="text"
                  placeholder="Eve Phone Number"
                  value={user.eve_phone || ''}
                  required
                />
              </div>
              <p className="help is-danger">
                {userError.field === 'eve_phone' ? userError.message : ''}
              </p>
            </div>
          </div>

          <div className="column is-6">
            <div className="field">
              <div className="control">
                <label className="label">New Password</label>
                <input
                  name="password"
                  onChange={_handleInput}
                  className="input"
                  type="text"
                  placeholder="New Password"
                  value={user.password || ''}
                  required
                />
              </div>
              <p className="help is-danger">
                {userError.field === 'password' ? userError.message : ''}
              </p>
            </div>
          </div>
        </div>

        <div className="mb-20">
          <button
            onClick={this._submitUser}
            className={`action-btn ${updatingUser ? 'loading' : ''}`}
          >
            Update Profile
          </button>
        </div>
      </form>
    );
  };

  _onSelectRegion = ({ target }) => {
    const { _handleInput, regions } = this.props;
    const regiondId = parseInt(target.value, 10);
    const region =
      regions.find(reg => reg.shipping_region_id === regiondId) || {};
    _handleInput({ target: { name: 'region', value: region.shipping_region } });
    _handleInput({
      target: { name: 'shipping_region_id', value: region.shipping_region_id },
    });
  };

  _renderAddress = () => {
    const {
      userError,
      _handleInput,
      user,
      regions,
      updatingUserAddress,
    } = this.props;
    return (
      <form onSubmit={this._submitAddress}>
        <h1 className="title">Shipping Address</h1>
        <p className="help is-danger">
          {userError.field === '' && userError.message ? userError.message : ''}
        </p>
        <div className="columns">
          <div className="column">
            <div className="field">
              <div className="control">
                <label className="label">Country</label>
                <input
                  name="country"
                  onChange={_handleInput}
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
          <div className="column">
            <div className="field">
              <label className="label">City</label>
              <div className="control">
                <input
                  name="city"
                  onChange={_handleInput}
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
              <label className="label">Postal Code</label>
              <div className="control">
                <input
                  name="postal_code"
                  onChange={_handleInput}
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

        <div className="field">
          <div className="control">
            <label className="label">Address 1</label>
            <textarea
              row="5"
              name="address_1"
              onChange={_handleInput}
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

        <div className="field">
          <div className="control">
            <label className="label">Address 2</label>
            <textarea
              row="5"
              name="address_2"
              onChange={_handleInput}
              className="textarea"
              type="text"
              placeholder="Address 2"
              value={user.address_2 || ''}
            />
          </div>
          <p className="help is-danger">
            {userError.field === 'address_2' ? userError.message : ''}
          </p>
        </div>

        <div className="mt-20 mb-20">
          <button
            onClick={this._submitAddress}
            className={`action-btn ${updatingUserAddress ? 'loading' : ''}`}
            disabled={!user.country || !user.city}
          >
            Update Address
          </button>
        </div>
      </form>
    );
  };

  _toGoShop = () => {
    const { _setCartModal } = this.props;
    _setCartModal();
  };

  _checkout = () => {
    console.log('checkout');
  };

  _empty = () => {
    const { _submitEmptyCart, cartId, _setCartModal } = this.props;
    _submitEmptyCart(cartId).then(() => {
      _setCartModal();
    });
  };

  render() {
    const { match, history } = this.props;
    return (
      <Layout match={match} history={history}>
        <div className="container">
          <div className="columns">
            <div className="column is-6 is-offset-3">
              <div className="box">
                {this._renderProfile()}
                <br />
                {this._renderAddress()}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

Settings.propTypes = {
  user: propTypes.object,
};

Settings.defaultProps = {
  user: {},
};

export const mapStateToProps = ({
  currentUser: {
    userError,
    user,
    loggingIn,
    updatingUser,
    updatingUserAddress,
  },
  shipping: { regions },
}) => ({
  user,
  loggingIn,
  updatingUser,
  updatingUserAddress,
  userError,
  regions,
});

export const mapDispatchToProps = dispatch => ({
  _handleInput: ({ target: { value, name } }) =>
    dispatch(setCurrentUserField({ name, value })),
  _updateUser: payload => dispatch(submitUpdateUser(payload)),
  _updateUserAddress: payload => dispatch(submitUpdateUserAddress(payload)),
  _fetchCurrentUser: () => dispatch(fetchCurrentUser()),
  _fetchShippingRegions: () => dispatch(fetchShippingRegions()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
