import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';

const generateSquareComponents = (squares, onClickCallback) => {
  const squareArray1D = [];

  for (let row of squares) {
    for (let square of row) {
      squareArray1D.push(square);
    }
  }
  const boardArray = squareArray1D.map((square) => {
    return (
      <Square
        key={square.id}
        value={square.value}
        id={square.id}
        onClickCallback={onClickCallback}
      />
    );
  });
  return boardArray;
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
