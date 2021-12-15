import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const player1 = 'X';
const player2 = 'O';


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

//squares[index].value = "" or "X" or "O"

const App = () => {
  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.

  //what is happening here
  //i want state to re-render my board when a square changes
  //squares is my array of squares by id
  //need to access the square by id
  //how can i tell which square is clicked on?
  const [squares, setSquares] = useState(generateSquares());
  //change square to x if player 1
  //change square to o if player 2
  

  let currentPlayer = player1;
  

  const updateBoard = () => {
    
  }




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

  // const resetGame = () => {
  //   // Complete in Wave 4
  // };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is ... -- Fill in for wave 3 </h2>
        <button>Reset Game</button>
      </header>
      <main>
        <Board squares={squares}> hi </Board>
      </main>
    </div>
  );
};

export default App;


//the method we need to create in app
//will update the GAME BOARD
//the onClickCallBack function will update the value property of the square object