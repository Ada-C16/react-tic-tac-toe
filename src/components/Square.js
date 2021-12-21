import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';

const Square = (props) => {
  // For Wave 1 enable this
  //  Component to alert a parent
  //  component when it's clicked on.

  const handleClick = () => {
    // only allow a click if the square hasn't been clicked yet
    if (props.value === '') {
      props.onClickCallback(props.id);
    }
  };

  return (
    <button
      id={props.id}
      className="square"
      onClick={handleClick}
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
  isDisabled: PropTypes.bool,
};

export default Square;
