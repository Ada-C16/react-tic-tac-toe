import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';

const Square = (props) => {
  let color = '';
  
  if (props.id === 0 || props.id === 5) {
    color = 'blue';
  } else if (props.id === 1 || props.id === 6) {
    color = 'yellow';
  } else if (props.id === 2 || props.id === 7) {
    color = 'green';
  } else if (props.id === 3 || props.id === 8) {
    color = 'pink';
  } else if (props.id === 4) { 
    color = 'orange';
  }

  const selectedSquare = () => {
    props.onClickCallback(props.id);
  };

  return <button className='square' id={color} onClick={selectedSquare}>{props.value}</button>;
};

Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Square;
