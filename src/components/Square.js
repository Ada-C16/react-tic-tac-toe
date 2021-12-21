import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';

const Square = (props) => {
  // For Wave 1 enable this 
  //  Component to alert a parent 
  //  component when it's clicked on.
  let classVal='';

  if (props.value==='x'){
    classVal='jasmine';
  }else if (props.value==='o'){
    classVal='chris';
  }
  return (
    <button className={`square ${classVal}`} onClick = {() => {props.onClickCallback(props.id);}}>
      {props.value}
    </button>
    );
};



Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Square;
