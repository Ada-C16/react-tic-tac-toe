import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';


const generateSquareComponents = (squares, onClickCallback) => {
  // Complete this for Wave 1
  // squares is a 2D Array, but 
  //  you need to return a 1D array
  //  of square components

  //small improvement to logging to see the location and the stringified object - Lety
  console.log('in generateSquareComnponents');
  console.log('1. the squares as a 2-dim array:');
  console.log(JSON.stringify(squares));
  
  let oneDimensionalArray = [];
  for (let i = 0; i < squares.length; i++) {
    for (let element of squares[i]) {
      oneDimensionalArray.push(element);
    }
  }
  console.log('2. the squares as a 1-dim array:');
  console.log(oneDimensionalArray);

  const squareComponents = oneDimensionalArray.map(square => {
    return (
      <Square id={square.id} value={square.value} onClickCallback={onClickCallback} key={square.id}/>
    );
  });

  //removing logging because they are rendering fine
  //console.log(`This is the square comps: ${squareComponents}`);
  return squareComponents;
};

const Board = ({ squares, onClickCallback }) => {
  const squareList = generateSquareComponents(squares, onClickCallback);

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
