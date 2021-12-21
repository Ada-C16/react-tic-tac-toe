import React from 'react';
import './Board.css';
import Square from './Square';
import PropTypes from 'prop-types';


const generateSquareComponents = (squares, onClickCallback) => {
  // Complete this for Wave 1
  // squares is a 2D Array, but 
  //  you need to return a 1D array
  //  of square components
  console.log('We are about to iterate through squares');
  let oneD =[];
  // let classVal='';
  for (let row of squares){
    for (let square of row) {
      // if (square.value==='x'){
      //   classVal='jasmine';
      // }else if (square.value==='o'){
      //   classVal='chris';
      // }
      oneD.push(<Square key={square.id} id={square.id} value={square.value} onClickCallback={onClickCallback} />);
    }
  }
  return oneD;

};

const Board = ({ squares, onClickCallback }) => {
  const squareList = generateSquareComponents(squares, onClickCallback);
  console.log(squareList);
  return( 
    <div className="grid" >
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
