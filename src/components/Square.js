import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';

const Square = (props) => {
  // For Wave 1 enable this
  //  Component to alert a parent
  //  component when it's clicked on.

  // explicit way of showing all of the operations that need to done to handle the onClick event.
  const alertBoard = () => {
    props.onClickCallback(props.id);
  };

  const buttonClickHandler = () => {
    alertBoard();
  };

  return (
    <button onClick={buttonClickHandler} className="square">
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
