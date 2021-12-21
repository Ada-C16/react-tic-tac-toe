import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';

// This turns the 2D array into a 1D array
// create a function that generates a list of components but not a component itself. the data is used transfer it into html which shows up into the browser
const generateSquareComponents = (squares, onClickCallback) => {
  const singleArraySquares = [].concat(...squares);
  return singleArraySquares.map((square) => {
    return (
      <Square
        value={square.value}
        id={square.id}
        onClickCallback={onClickCallback}
        key={square.id}
      />
    );
  });
};

// create a component 
const Board = ({ squares, onClickCallback }) => {
  const squareList = generateSquareComponents(squares, onClickCallback);
  console.log(squareList);
  return <div className='grid'>{squareList}</div>;
};
// describe what your data confirms as props 
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
