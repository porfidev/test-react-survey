import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ label}) => {
  return (
    <div>
      <button>{label}</button>
    </div>
  );
};

Button.propTypes = {

};

export default Button;
