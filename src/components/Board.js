import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';


const generateSquareComponents = (squares, onClickCallback) => {
  // Complete this for Wave 1
  // squares is a 2D Array, but 
  //  you need to return a 1D array
  //  of square components
  console.log(squares);
  let oneDimensionalArray = [];
  for (let i = 0; i < squares.length; i++) {
    for (let element of squares[i]) {
      oneDimensionalArray.push(element);
    }
  }
  console.log(oneDimensionalArray);

  const squareComponents = oneDimensionalArray.map(square => {
    return (
      <Square id={square.id} value={square.value} onClickCallback={onClickCallback} key={square.id}/>
    );
  });

  console.log(`This is the square comps: ${squareComponents}`);
  return squareComponents;
};

const Board = ({ squares, onClickCallback }) => {
  const squareList = generateSquareComponents(squares, onClickCallback);
  console.log(`This is squareList: ${squareList}`);
  return(<div className="grid" >
    {squareList}
  </div>
  );
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
