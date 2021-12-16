import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';


const Square = (props) => {
  // For Wave 1 enable this 
  //  Component to alert a parent 
  //  component when it's clicked on.

  const onSquareClick = () => {
    const markedSquare = {
      value: 'x',
      id: props.id
    };
    props.onClickCallback(markedSquare);
    console.log('Clicked: ', props.id);
    console.log('Value:', props.value);
  };

  return <button onClick={onSquareClick} className='square'>{props.value}</button>;
};

Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Square;
