import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';

const generateSquareComponents = (squares, updateSquares) => {
  const singleArray = [];

  for (let subArray = 0; subArray < squares.length; subArray++) {
    squares[subArray].forEach((square) => {
      singleArray.push(square);
    });
  }

  const squaresArray = singleArray.map((square) => {
    return (
      <Square
        key={square.id}
        id={square.id}
        value={square.value}
        updateSquares={updateSquares}
      ></Square>
    );
  });
  return squaresArray;
};

const Board = ({ squares, updateSquares }) => {
  const squareList = generateSquareComponents(squares, updateSquares);
  console.log(squareList);
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
  updateSquares: PropTypes.func.isRequired,
};

export default Board;
