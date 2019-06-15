import React from 'react';
import ContentLoader from 'react-content-loader';
import propTypes from 'prop-types';
import './ItemsLoader.scss';

const ItemsLoader = props => (
  <div className="content-loader">
    <ContentLoader
      height="475"
      width="400"
      speed="2"
      primaryColor="#f3f3f3"
      secondaryColor="#9a9a9a"
      {...props}
    >
      <rect x="0" y="0" rx="0" ry="0" width="120" height="100" />
      <rect x="140" y="0" rx="0" ry="0" width="120" height="100" />
      <rect x="280" y="0" rx="0" ry="0" width="120" height="100" />
      <rect x="0" y="120" rx="0" ry="0" width="120" height="100" />
      <rect x="140" y="120" rx="0" ry="0" width="120" height="100" />
      <rect x="280" y="120" rx="0" ry="0" width="120" height="100" />
    </ContentLoader>
  </div>
);

ItemsLoader.propTypes = {
  height: propTypes.number,
  width: propTypes.number,
  speed: propTypes.number,
};

ItemsLoader.defaulProps = {
  height: 475,
  width: 400,
  speed: 2,
};

export default ItemsLoader;
