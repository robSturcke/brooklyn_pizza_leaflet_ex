import React from 'react';
import PropTypes from 'prop-types';

const Wrap = ({ children }) => (
  <div className="wrap">
    <div className="container-fluid">
      <div className="row">{children}</div>
    </div>
  </div>
);

Wrap.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string,
};

export default Wrap;
