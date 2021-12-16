import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';

const generateSquareComponents = (squares, onClickCallback) => {
  /*
    squares = [
      [x,x,x], // row 0
      [x,x,x], // row 1
      [x,x,x], // row 2
    ]
  */
  return squares.reduce((squaresArray, row) => {
    return squaresArray.concat(
      row.map((square) => {
        return (
          <Square
            value={square.value}
            key={square.id}
            onClickCallback={onClickCallback}
            id={square.id}
          />
        );
      })
    );
  }, []);
};

const Board = ({ squares, onClickCallback }) => {
  const squareList = generateSquareComponents(squares, onClickCallback);
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
  onClickCallback: PropTypes.func.isRequired,
};

export default Board;
