import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';

// This turns the 2D array into a 1D array
// this function is creating 9 Square tags that will be the html that renders for the UI
const generateSquareComponents = (squares, onClickCallback) => {
  const singleArraySquares = [].concat(...squares);
  return singleArraySquares.map((square) => {
    return (
      <Square //props being assigned
        value={square.value}
        id={square.id}
        onClickCallback={onClickCallback}
        key={square.id}
      />
    );
  });
};
// squares is avalilable here to Board bc Board gets called by App and App has squares
// and App gives squares to Board via the props definition in App where App calls Board and uses
// squares as a parameter, same explanation applies for onClickCallback, except onClickCallback
// doesn't exist yet in App, needs to be written
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
