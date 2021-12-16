import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';

const generateSquareComponents = (squares, onClickCallback) => {
  // Complete this for Wave 1
  // squares is a 2D Array, but
  //  you need to return a 1D array
  //  of square components
  const squareComponents = [];
  // squares.forEach(square => {
  //   square.forEach(row => {
  //     squareComponents.push(
  //       <Square
  //         value={square.value}
  //         id={square.id}
  //         onClickCallback={onClickCallback}
  //       />
  //   );
  // });
  for (let row of squares) {
    for (let square of row) {
      console.log('hieeeee');
      squareComponents.push(
        <Square
          value={square.value}
          id={square.id}
          onClickCallback={onClickCallback}
        />
      );
    }
  }
  return squareComponents;
};

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
