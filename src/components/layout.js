import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import Header from './header';
import Footer from './footer';

const Layout = ({ children }) => (
  <>
    <Helmet>
      <title>Brooklyn's Finest Pizza - React Maps Leaflet Example</title>
    </Helmet>
    <div className="map_wrap">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  pageName: PropTypes.string,
};

export default Layout;
