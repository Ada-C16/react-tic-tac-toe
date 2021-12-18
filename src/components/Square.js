import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';

const Square = ({ value, id, onClickCallback, disabled }) => {
  return (
    <button
      onClick={() => onClickCallback(id)}
      className="square"
      disabled={disabled}
    >
      {value}
    </button>
  );
};

Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
};

export default Square;
