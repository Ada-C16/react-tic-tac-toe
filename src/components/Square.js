import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';

const Square = (props) => {
  // For Wave 1 enable this 
  //  Component to alert a parent 
  //  component when it's clicked on.

  const onSquareClick = () => {
    const markedSquare = {
      value: props.playerTurn,
      id: props.id
    };
    props.onClickCallback(markedSquare);
  };

  return <button disabled={props.winnerState !== null} 
  onClick={onSquareClick} className='square'>{props.value}</button>;
};

Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  playerTurn: PropTypes.string.isRequired,
  winnerState: PropTypes.oneOf(['X', 'O', null])

};

export default Square;
