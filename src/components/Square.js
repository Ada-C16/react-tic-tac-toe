import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';



const Square = (props) => {
  // For Wave 1 enable this 
  //  Component to alert a parent 
  //  component when it's clicked on.

  const squareClick = () => {
    props.onClickCallback(props.id);
    // console.log(props.id);
  };

  return <button onClick={squareClick} className='square' id={props.id}>{props.value}</button>;
};

Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Square;
