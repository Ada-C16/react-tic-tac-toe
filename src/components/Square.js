import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';

const Square = (props) => {
  // For Wave 1 enable this
  //  Component to alert a parent
  //  component when it's clicked on.

  return (
    // creating anonymous function so that every time button is created it does
    //NOT call onClickCallback, only gets called when onClick is registered and then uses
    // specific square id
    <button onClick={() => props.onClickCallback(props.id)} className="square">
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
