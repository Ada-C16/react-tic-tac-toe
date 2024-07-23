import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';

// This turns the 2D array into a 1D array
const generateSquareComponents = (squares, onClickCallback) => {
  const singleArraySquares = [].concat(...squares);
  return singleArraySquares.map((square) => {
    return (
      // map returns a square component for each object
      // each one gets a value, id, onClickCallBack, and a unique key
      <Square
        value={square.value}
        id={square.id}
        onClickCallback={onClickCallback}
        key={square.id} // just a unique identifier that React needs
      />
    );
  });
  // returns an array of square components
};

const Board = ({ squares, onClickCallback }) => {
  const squareList = generateSquareComponents(squares, onClickCallback);
  console.log(squareList);
  // this div is an HTML container that'll be used to style and display
  // the array of square components
  // to interact with the board, you'll click a button in the array of buttons
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
