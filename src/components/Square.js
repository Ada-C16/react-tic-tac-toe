import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';



const Square = (props) => {
  
  const squareClick = () => {
    props.onClickCallback(props.id);
  };

  return <button onClick={squareClick} className='square' id={props.id}>{props.value}</button>;
};

Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Square;
