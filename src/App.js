import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

const generateSquares = () => {
  const squares = [];

  let currentId = 0;

// outer loop adds each row of squares
  for (let row = 0; row < 3; row += 1) {
    squares.push([]);

// inner loop adds individual squares within each row
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
  const [squares, setSquares] = useState(generateSquares()); // useState calls generateSquares() to sets the initial state of squares
  const [player, playerTurn] = useState(PLAYER_1); // sets initial state to PLAYER_1 > the first move will always be 'x'
  let [winner, checkWinner] = useState(''); 

  // function to update state to board
  const onClickCallback = (id) => { // when a square component is clicked, its id prop value is passed to this function
    
  if (winner) { // this logic makes the squares unclickable once we have a winner
    return;
  }

    const newSquares = squares.map((squareArray) => { // this logic creates a new object, which is ultimately used to re-render the board with new states
      for (const insideSquare of squareArray) {
        if (insideSquare.id === id) { // finds the square whose id matches the id that is passed in when onClickCallback is called
          insideSquare.value = player; // and then sets that square's value to either 'x' or 'o', depending on the next part of the function
        }
      }
      return squareArray;
    });

    if (player === PLAYER_1) { // logic to toggle which player's turn it is, which changes whether to set the square's value as 'x' or 'o'
      playerTurn(PLAYER_2);
    }
    else {
      playerTurn(PLAYER_1);
    }
    setSquares(newSquares); // the new state of squares is in newSquares, which is now to be updated by setSquares
    checkWinner(checkForWinner()); // checks/updates state of winner, and calls checkForWinner() inside checkWinner
  };

  const checkForWinner = () => {
    // this function first checks row by row whether the value in each square is the same; if it is, we return that value to checkWinner() and update the state of winner
    // then checks column by column
    // then checks for a winner diagonally

    let row = 0;
    let col = 0;

    // check for winning combo in rows
    while (row < 3) {
      if (
        squares[row][0].value === squares[row][1].value &&
        squares[row][2].value === squares[row][1].value &&
        squares[row][0].value != ''
      ) {
        return squares[row][0].value;
      } else row += 1;
    }
    // check for winning combo in columns
    while (col < 3) {
      if (
        squares[0][col].value === squares[1][col].value &&
        squares[2][col].value === squares[1][col].value &&
        squares[0][col].value != ''
      ) {
        return squares[0][col].value;
      } else col += 1;
    }
    // check for winning combo diagonally
    if (
      squares[0][0].value === squares[1][1].value &&
      squares[2][2].value === squares[1][1].value &&
      squares[0][0] != ''
    ) {
      return squares[0][0].value;
    } else if (
      squares[0][2].value === squares[1][1].value &&
      squares[2][0].value === squares[1][1].value &&
      squares[0][2] != ''
    ) {
      return squares[0][2].value;
    } else { // if we don't find a winner in the rows, columns, or diagonally, we look for squares the value of '', which means the game is ongoing, and the winner still has state of ''
      for (let array of squares) {
        for (let element of array) {
          if (element.value == '') {
            return '';
          }
          continue;
        }
      }
      return 'Tie'; // if all squares have a value (aka value is not ''), the game is tied, and the state of winner is 'Tie'
    }
  };


  const resetGame = () => {
    // Complete in Wave 4
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is ... {winner} </h2>
        <button>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickCallback}/> 
      </main>
    </div>
  );
};

export default App;