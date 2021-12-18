import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';

const generateSquareComponents = (squares, onClickCallback) => {
  const result = [];
  for (let i = 0; i < 3; i++) {
    for (let k = 0; k < 3; k++) {
      let square = squares[i][k];
      result.push(
        <Square
          value={square.value}
          id={square.id}
          key={square.id}
          onClickCallback={onClickCallback}
          disabled={square.disabled} //not working yet
        ></Square>
      );
    }
  }
  return result;
};

const Board = ({ squares, onClickCallback }) => {
  const squareList = generateSquareComponents(squares, onClickCallback);
  return <div className="grid">{squareList}</div>;
};

Board.propTypes = {
  squares: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
      })
    )
  ),
  onClickCallback: PropTypes.func.isRequired,
};

export default Board;
