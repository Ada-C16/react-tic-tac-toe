import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';


const Square = (props) => {
  // For Wave 1 enable this 
  //  Component to alert a parent 
  //  component when it's clicked on.

  const onSquareClick = () => {
    const markedSquare = {
      value: props.value.concat('c'),
      id: props.id,
      clicked: !props.clicked
    };
    console.log('Clicked!');
    props.onClickCallback(markedSquare);
    console.log('square', markedSquare.id , 'value is now:', markedSquare.value);
  };

  return <button onClick={onSquareClick} className='square'>{props.value}</button>;
};

Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  clicked: PropTypes.bool
};

export default Square;
