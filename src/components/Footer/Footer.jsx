import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.scss';
import facebookIcon from '../../assets/icons/icons-facebook-grey.png';
import twitterIcon from '../../assets/icons/icons-twitter-grey.png';
import instagramIcon from '../../assets/icons/icons-instagram-grey.png';
import pinterestIcon from '../../assets/icons/icons-pinterest-grey.png';

const Footer = () => (
  <footer className="page-footer">
    <div className="container">
      <div className="columns">
        <div className="column is-flex content-space-around">
          <Link to="/items" className="footer-link">
            Women
          </Link>
          <Link to="/items" className="footer-link">
            Men
          </Link>
          <Link to="/items" className="footer-link">
            Kids
          </Link>
          <Link to="/items" className="footer-link">
            Shoes
          </Link>
          <Link to="/items" className="footer-link">
            Brands
          </Link>
        </div>
      </div>
      <div className="columns">
        <div className="column is-flex content-center">
          <div className="footer-socials">
            <img
              src={instagramIcon}
              className="footer-socials__icon"
              alt="Social icon"
            />
            <img
              src={pinterestIcon}
              className="footer-socials__icon"
              alt="Social icon"
            />
            <img
              src={twitterIcon}
              className="footer-socials__icon"
              alt="Social icon"
            />
            <img
              src={facebookIcon}
              className="footer-socials__icon"
              alt="Social icon"
            />
          </div>
        </div>
      </div>
      <div className="columns">
        <div className="column has-text-center">
          <h1 className="footer-copyright">
            ©2016 shopmate Ltd • Contact • Privacy policy
          </h1>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
