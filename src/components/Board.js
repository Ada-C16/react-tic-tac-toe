import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';


const generateSquareComponents = (squares, onClickCallback) => {
  let squaresArray = [];
  
  for (let rowIndex in squares) {
    for (let objectIndex in squares[rowIndex]) {
      squaresArray.push(<Square key={squares[rowIndex][objectIndex].id} value={squares[rowIndex][objectIndex].value} id={squares[rowIndex][objectIndex].id} onClickCallback={onClickCallback}></Square>)
    }
  }

  return squaresArray;
}


const Board = ({ squares, onClickCallback }) => {
  const squareList = generateSquareComponents(squares, onClickCallback);
  console.log(squareList);
  return <div className="grid" >
    {squareList}
  </div>
}

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
