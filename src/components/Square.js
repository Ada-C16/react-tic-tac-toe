import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';

const Square = ({ id, value, updateSquare }) => {
  // For Wave 1 enable this
  //  Component to alert a parent
  //  component when it's clicked on.
  const onSquareClick = () => {
    console.log('are you there god?');
    updateSquare(id);
  };

  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
};

Square.propTypes = {
  value: PropTypes.string.isRequired,
  updateSquare: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Square;
