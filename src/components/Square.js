import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';


const Square = (props) => {

  const captureSquareData = () => {
    props.onClickCallback(props.id);
    
  };

  return <button className='square' onClick={captureSquareData}>{props.value}</button>;
};
//the moment we click on square it lifts that data from board to app and app 
//has the data to tell us which square it was and updates the info

Square.propTypes = {
  value: PropTypes.string.isRequired, //We need an X or O as a string
  onClickCallback: PropTypes.func.isRequired, //we need a function here
  id: PropTypes.number.isRequired, //we need the id of the square
};

export default Square;

