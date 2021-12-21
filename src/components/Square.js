import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';

const Square = (props) => {
  // For Wave 1 enable this
  //  Component to alert a parent
  //  component when it's clicked on.

  return (
    <button
      id={props.id}
      className="square"
      onClick={() => props.onClickCallback(props.id)}
      disabled={props.isDisabled}
    >
      {props.value}
    </button>
  );
};

Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

export default Square;
