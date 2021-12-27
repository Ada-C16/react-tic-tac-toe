import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';

// This turns the 2D array into a 1D array
const generateSquareComponents = (squares, onClickCallback, playerTurn, winnerState) => {
  const singleArraySquares = [].concat(...squares);
  return singleArraySquares.map((square) => {
    return (
      <Square
        value={square.value}
        id={square.id}
        onClickCallback={onClickCallback}
        playerTurn={playerTurn}
        key={square.id}
        winnerState={winnerState}
      />
    );
  });
};

const Board = ({ squares, onClickCallback, playerTurn, winnerState }) => {
  const squareList = generateSquareComponents(squares, onClickCallback, playerTurn , winnerState);
  console.log(squareList);
  return <div className='grid'>{squareList}</div>;
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
  playerTurn: PropTypes.string.isRequired,
  winnerState: PropTypes.oneOf(['X', 'O', null])
};

export default Board;
