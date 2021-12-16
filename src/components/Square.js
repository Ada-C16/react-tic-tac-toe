import React from 'react';
import PropTypes from 'prop-types';

import './Square.css';

const Square = (props) => {
  // For Wave 1 enable this 
  //  Component to alert a parent 
  //  component when it's clicked on.

  return (
          <button
            className="square"
            // I think we should have the onClick bound to the button here and use the onClickCallBack.  - Lety
            onClick={props.onClickCallback}
            // and we need the square/button to have an ID that we can reference to update the value both
            // in the array and therefore on the screen because the array is updated by useState.
            id={props.id}
          >
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
