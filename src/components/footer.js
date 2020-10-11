import React from 'react';
import Wrap from './wrap';

const Footer = () => (
  <footer>
    <Wrap>
      <div className="col-12">
        <p>
          {new Date().getFullYear()} •{' '}
          <a href="https://github.com/robSturcke">robSturcke</a>
        </p>
      </div>
    </Wrap>
  </footer>
);

export default Footer;
