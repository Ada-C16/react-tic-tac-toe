import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';

const Square = ({ id, value, onClickCallback }) => {
  return (
    <button onClick={onClickCallback(id)} className="square">
      {value}
    </button>
  );
};

Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Square;
