import React from 'react';
import { Link } from 'react-router-dom';
import './OrderFinish.scss';

const OrderFinish = () => (
  <div className="has-text-centered">
    <h3 className="title is-3">Success!</h3>
    <p>
      Your items will be shipped shortly, <br />
      you will get email with details.
    </p>
    <Link to="/" className="back-btn">Back to shop</Link>
  </div>
);

export default OrderFinish;
