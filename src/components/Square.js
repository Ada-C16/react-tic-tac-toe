import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';

const Square = (props) => {
  // For Wave 1 enable this 
  //  Component to alert a parent 
  //  component when it's clicked on.
  const boardInfo = () => {
    props.onClickCallback(props.id);
  };
  const buttonClick = () => {
    boardInfo();
  };
  return <button className='square' onClick ={buttonClick}>{props.value}</button>;
};


// const Square = (props) => {
//   const squareData = () => {
//     //conditional logic to check if square has x or o value
//       props.onClickCallback(props.id);
//   };

//   return <button className="square" onClick={squareData}>{props.value}</button>;
// };


Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Square;
