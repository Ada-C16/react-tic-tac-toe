import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';


//dont know if this is right
// import './App.js';

const Square = (props) => {
  // For Wave 1 enable this 
  //  Component to alert a parent 
  //  component when it's clicked on

  //in order to update teh square content i need to HAVE the square content
  //the function needs capture the square data
  const captureSquareData = () => {
    //app, in order to mark the square, needs to konw the id of the clicked square
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

