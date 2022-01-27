import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';

const generateSquareComponents = (squares, onClickCallback) => {
  // Creates nested list of current squares
  let allSquares = [];
  squares.forEach((row) => {
    for (let i = 0; i < 3; i++) {
      allSquares.push(row[i]);
    }
  });

  const squareComponents = allSquares.map((square) => {
    // Generates Square components from array of current squares
    return (
      <Square
        key={square.id}
        value={square.value}
        onClickCallback={onClickCallback}
        id={square.id}
        disabled={square.disabled}
      />
    );
  });
  return <div className="grid">{squareComponents}</div>;
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
