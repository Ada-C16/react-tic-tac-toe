import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';

const Square = (props) => {
  const onClick = () => {
    props.onClickCallback(props.id);
  };

  return (
    <button onClick={onClick} className="square">
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
