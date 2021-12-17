import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';

const Square = ({ value, id, onClickCallback }) => {
  const updateSquare = () => {
    // console.log(id);
    if (value === '') {
      value = 'update';
      onClickCallback(id);
    }
  };
  // For Wave 1 enable this
  //  Component to alert a parent
  //  component when it's clicked on.

  return (
    <button onClick={updateSquare} className="square">
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
