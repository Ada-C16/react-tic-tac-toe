import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';

// Complete this for Wave 1
// squares is a 2D Array, but
//  you need to return a 1D array
//  of square components
// squares currently " ", saves it in a state at the beginning of app
const generateSquareComponents = (squares, onClickCallback) => {
  // console.log('rendering square components');
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
  // console.log(squareList);
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
