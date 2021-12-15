import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';


const generateSquareComponents = (squares, onClickCallback) => {
  // Complete this for Wave 1
  // squares is a 2D Array, but 
  //  you need to return a 1D array
  //  of square components
  console.log(`This is squares: ${squares}`);
  const squareComponents = squares.map(square => {
    return (
      <div key={square.id}><Square id={square.id} value={square.value} /></div>
    );
  });

  console.log(`This is the square comps: ${squareComponents}`);
  return <section>{squareComponents}</section>;
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
