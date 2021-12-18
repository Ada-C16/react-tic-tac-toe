import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'X';
const PLAYER_2 = 'O';

// this creates our 2-d array of objects
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
  // squares - 2D array

  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback

  const setSquareValue = (id) => {
    //const PLAYER_1 = 'X';
    // const PLAYER_2 = 'O';
    // counters for row & column
    let row = 0;
    let col = 0;
    // has square been clicked?
    let clicked = false;

    // make copy of squares state
    const newSquares = [...squares];

    // finding if square has been clicked 
    while (row < 3 && !clicked) {
      while (col < 3 && !clicked) {
        let presentSquares = newSquares[row][col]; 
        if (presentSquare.id === id) {
          if (presentSqaure.value !== '') {
            // how to render the x and o
          square.value = PLAYER_1;
        }
        square.value = PLAYER_2;
      )}}}
    setSquares(newSquares);
  }

  const checkForWinner = () => {
    // Complete in Wave 3
    // You will need to:
    // 1. Go accross each row to see if
    //    3 squares in the same row match
    //    i.e. same value
    // 2. Go down each column to see if
    //    3 squares in each column match
    // 3. Go across each diagonal to see if
    //    all three squares have the same value.
  };

  const resetGame = () => {
    // Complete in Wave 4
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is ... -- Fill in for wave 3 </h2>
        <button>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={setSquareValue} />
      </main>
    </div>
  );
};

export default App;
