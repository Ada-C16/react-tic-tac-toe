import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';


const generateSquareComponents = (squares, onClickCallback) => {
  const singleArray = [];
  //convert 2d array into 1d array
  for (let subArray = 0; subArray < squares.length; subArray++) {
    squares[subArray].forEach(square => {
      singleArray.push(square);
    });
  }
  //return a .map the 1d array of objects
  const squaresArray = singleArray.map((square) => {
    return <Square key = {square.value} value = {square.value}></Square>;
  });
  
  return squaresArray;
  // Complete this for Wave 1
  // squares is a 2D Array, but 
  //  you need to return a 1D array
  //  of square components 
  
  // <square />
};

const Board = ({ squares, onClickCallback }) => {
  const squareList = generateSquareComponents(squares, onClickCallback);
  console.log(squareList);
  return <div className="grid" >
    {squareList}
  </div>;
};

Board.propTypes = {
  squares: PropTypes.arrayOf(
    PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired
      })
    )
  ),
  onClickCallback: PropTypes.func.isRequired,
};

export default Board;
