import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.scss';

const NotFound = () => (
  <section id="not-found">
    <div className="hero is-fullheight">
      <div className="hero-body">
        <div className="container has-text-centered">
          <div className="error-code">
            4 <i className="fa fa-ban" /> 4
          </div>

          <h4 className="title is-4">
            The page you are looking for was not found
          </h4>

          <Link to="/" className="button">
            To Home
          </Link>
        </div>
      </div>
    </div>
  </section>
);

export default NotFound;
