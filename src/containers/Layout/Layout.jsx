import React from 'react';
import PropTypes from 'prop-types';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Layout.scss';

const Layout = ({ children, match }) => (
  <React.Fragment>
    <Header match={match} />
    <div className="main-content">{children}</div>
    <Footer />
  </React.Fragment>
);

Layout.propTypes = {
  childreen: PropTypes.any,
  match: PropTypes.any,
};

Layout.defaultProps = {
  childreen: '',
  match: { params: {} },
};

export default Layout;
