import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';

const generateSquareComponents = (squares, onClickCallback) => {
  const squaresTo2D = [].concat(...squares);
  return squaresTo2D.map((square) => {
    return (
      <Square
        value={square.value}
        id={square.id}
        onClickCallback={onClickCallback}
        key={square.id}/>
    );
  });
};

const Board = ({ squares, onClickCallback }) => {
  const squareList = generateSquareComponents(squares, onClickCallback);

  return (
    <div className="grid" role="button">
      {squareList}
    </div>
  );
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