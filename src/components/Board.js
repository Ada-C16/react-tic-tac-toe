import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';

const generateSquareComponents = (squares, onClickCallback) => {
  console.log('genereate square components func', squares);
  const squareComponents = [].concat(...squares);
  return squareComponents.map((square) => {
    return (
      <Square
        value={square.value}
        id={square.id}
        onClickCallback={onClickCallback}
        key={square.id}
      />
    );
  });
};

const Board = ({ squares, onClickCallback }) => {
  const squareList = generateSquareComponents(squares, onClickCallback);
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

// for (let row = 0; row < 3; row += 1) {
//     squares.push([]);
//     for (let col = 0; col < 3; col += 1) {
//       squares[row].push({
//         id: currentId,
//         value: '',
//       });
//       currentId += 1;
//     }
//   }
