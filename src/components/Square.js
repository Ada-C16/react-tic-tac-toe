import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';

const Square = (props) => {
  const squareData = () => {
    console.log(props);
    props.onClickCallback(props.id);
  };
  return <button className="square">{props.value}</button>;
};

/// TAKE ONE
// const Square = (props) => {
//   return <button className="square">{props.value}</button>;
// };

Square.propTypes = {
  value: PropTypes.string.isRequired,
  onClickCallback: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
};

export default Square;
