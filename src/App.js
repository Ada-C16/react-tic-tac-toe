import { PROPERTY_TYPES } from '@babel/types';
import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

const generateSquares = () => {
  const squares = [];

  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
      });
      currentId += 1;
    }
  }

  return squares;
};

const App = () => {
  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares());

  // const [clickedOn, setClickedOn] = useState(false);

  // Wave 2

  let currentPlayer = PLAYER_1;

  const onClickCallback = (x) => {
    console.log(x);
    squares[0][0].value = 'x';
    console.log(squares[0][0].value);
    console.log(squares[0][1].value);
    console.log(squares[0][0].id);
    // iterate through all the sqaure and check for their id's and if id matches the one that came back from sqaure then put x or 0
    // x = data being sent from square to app (which square was clicked)
    //determine what data need from square and then what do with that info-(game logic like put x or 0, end or continue game)
    // ID data=more useful than just props.value
  };
  

  const yesClicked = () => {

    // className
    // setClickedOn((current) => current + 1);
    
    // console.log(clickedOn);
  };

  const printMessage = () => {
    
    console.log('Now, we\'re in printMessage!');
};

  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback

  const checkForWinner = () => {
    let i = 0;

    // Check all the rows and columns for a winner
    while (i < 3) {
      if (
        squares[i][0].value === squares[i][1].value &&
        squares[i][2].value === squares[i][1].value &&
        squares[i][0].value !== ''
      ) {
        return squares[i][0].value;
      } else if (
        squares[0][i].value === squares[1][i].value &&
        squares[2][i].value === squares[1][i].value &&
        squares[0][i].value !== ''
      ) {
        return squares[0][i].value;
      }
      i += 1;
    }
    // Check Top-Left to bottom-right diagonal
    if (
      squares[0][0].value === squares[1][1].value &&
      squares[2][2].value === squares[1][1].value &&
      squares[1][1].value !== ''
    ) {
      return squares[0][0].value;
    }

    // Check Top-right to bottom-left diagonal
    if (
      squares[0][2].value === squares[1][1].value &&
      squares[2][0].value === squares[1][1].value &&
      squares[1][1].value !== ''
    ) {
      return squares[0][2].value;
    }

    return null;
  };

  const resetGame = () => {
    // Complete in Wave 4
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is ... -- Fill in for wave 3 </h2>
        <button onClick={printMessage} >Reset Game</button>
      </header>
      <main>
        <Board onClickCallback={onClickCallback} squares={squares}/>
      </main>
    </div>
  );
};

export default App;
