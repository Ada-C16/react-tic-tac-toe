import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';

const Square = ({ id, value, onClickCallback }) => {
  const notifyBoard = () => {
    onClickCallback(id);
  };
  // const styles = {
  //   if(value) {
  //     styles.color = player === PLAYER_1 ? {color: 'green'} : {color: 'red'};
  //   },
  // };

  const buttonClickedHandler = () => {
    notifyBoard();
  };

  return (
    <button
      key={id}
      style={value === 'x' ? { color: 'green' } : { color: 'red' }}
      className="square"
      onClick={buttonClickedHandler}
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
