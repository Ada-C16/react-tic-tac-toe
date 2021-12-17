import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';


const Square = (props) => {
  // For Wave 1 enable this 
  //  Component to alert a parent 
  //  component when it's clicked on.

  const onSquareClick = () => {
    if (props.value === '') {
      const markedSquare = {
        value: props.playerTurn,
        id: props.id
      };
      props.onClickCallback(markedSquare);
    }
  };

  return <button onClick={onSquareClick} disabled={props.won} className='square'>{props.value}</button>;
};

Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  playerTurn: PropTypes.string,
  won: PropTypes.string
};

export default Square;
