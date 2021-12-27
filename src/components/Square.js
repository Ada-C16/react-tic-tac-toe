import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';

const Square = ({ id, value, onClickCallback }) => {
  const updateSquare = () => {
    onClickCallback(id); //passes id to onClickCallback
  };

  // const playerColor = isPlayedIn ? 'green' : 'red'; //ternary operator

  return (
    <button
      key={id}
      className="square"
      // className={playerColor}
      onClick={updateSquare}
    >
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
