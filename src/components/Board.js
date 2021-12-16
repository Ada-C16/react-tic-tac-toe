import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';

// This turns the 2D array into a 1D array
const generateSquareComponents = (squares, onClickCallback, playerTurn, won) => {
  const singleArraySquares = [].concat(...squares);
  return singleArraySquares.map((square) => {
    return (
      <Square
        value={square.value}
        id={square.id}
        onClickCallback={onClickCallback}
        key={square.id}
        playerTurn={playerTurn}
        won={won}
      />
    );
  });
};

const Board = ({ squares, onClickCallback, playerTurn, won }) => {
  const squareList = generateSquareComponents(squares, onClickCallback, playerTurn, won);
  // console.log(squareList);
  return <div className='grid'>{squareList}</div>;
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
  playerTurn: PropTypes.string.isRequired,
  won: PropTypes.string
};

export default Board;
