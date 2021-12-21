import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';


const generateSquareComponents = (squares, onClickCallback) => {
  // Complete this for Wave 1
  // squares is a 2D Array, but 
  //  you need to return a 1D array
  //  of square components
  
  //step 1: make variable for a 1d-array
  const oneDSquares = [].concat(...squares);

  //step 2: write the return before you make the logic 
  return (
    oneDSquares.map((square) => {
      return (
        //step 3: return the Square component with its properties
        <Square 
        value={square.value} //x, o, or nothing
        id={square.id} //id of the specific square
        onClickCallback={onClickCallback} //the function from app
        key={square.id} //under the hood magic
        />
      );
    }));
};

const Board = ({ squares, onClickCallback }) => {
  const squareList = generateSquareComponents(squares, onClickCallback);
  console.log(squareList);
  return <div className="grid" >{squareList}</div>;
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
