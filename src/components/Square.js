import React from 'react';
import PropTypes from 'prop-types';

import './Square.css'

const Square = (props) => {
  // For Wave 1 enable this 
  //  Component to alert a parent 
  //  component when it's clicked on.

  //step 5: make the function that calls the event handler defined in app and give it props
  const clickSquareButton = () => {
    props.onClickCallback(props.id);
  };

  //this is a button...
  //Our square IS the button styled by the CSS corresponding to our class name
  //props.value being sent is telling us to render x, o, or nothing on click
  //step 4: create the event listener onClick and set it equal to the function that handles it
  return <button className="square" onClick={clickSquareButton}>{props.value}</button>;
};

Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Square;
