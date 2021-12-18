import React from 'react';
import PropTypes from 'prop-types';

import './Square.css'

const Square = (props) => {
  const clickSquareButton = ()=>{
    props.onClickCallback(props.id);

  };
 

  return <button
    className="square" onClick={clickSquareButton}
  >
    {props.value}
  </button>
}

Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Square;
