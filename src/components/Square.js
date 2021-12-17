import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';

const Square = (props) => {
  const callback = () => {
    props.onClickCallback(props.id);
  };
  return (
    <button className="square" data-pro={props.value} onClick={callback}>
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
