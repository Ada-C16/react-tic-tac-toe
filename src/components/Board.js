import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';


const generateSquares = (squares, onClickCallback) => {
  // by console logging an object shows the variable with variable name as the key
  console.log({squares});
  // need to unpack the squares prop that is coming in from app.js
  const arrayToLoopThru = [];
  const unpackedSquares = arrayToLoopThru.concat(...squares);
  console.log({unpackedSquares});

  // how .map works From documentation: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map
return unpackedSquares.map(square => {
const id = square.id
const value = square.value
  console.log({id, value});
  // .map needs a key to return in the component https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-key.md 
  return <Square key={square.id}/>;
  
});

  
};

const Board = ({ squares, onClickCallback }) => {

  const squareList = generateSquares(squares, onClickCallback);
  console.log(squareList);
  return <div className="grid" >
    {squareList}
  </div>;
};

Board.propTypes = {
  squares: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired
  }))),
  onClickCallback: PropTypes.func.isRequired,
};

export default Board;