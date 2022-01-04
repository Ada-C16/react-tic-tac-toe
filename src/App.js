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

  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);

  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback
  const onClickCallback = (squareID) => {
    if (winner){
      return;
    }

    let madeMove = false;

    const newSquares = squares.map(row => row.map(position => {
      if (position.id != squareID){
        return position;
      }
      if (position.value !== ''){
        return position;
      }
      madeMove = true;
      const newSquare = {...position, value: currentPlayer};
      return newSquare;
    }));

    if (madeMove) {
      //update the board
      setSquares(newSquares);
    
      // change the player with each click
      let nextPlayer = (currentPlayer === PLAYER_1) ? PLAYER_2 : PLAYER_1;
      setCurrentPlayer(nextPlayer);
    }
  };

  const checkForWinner = (event) => {
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

  const winner = checkForWinner();

  const showStatus = () => {
    if (winner){
      // alert(`You did amazing ${winner}!`)
      return `Winner is ${winner}`;
    }else{
      return `Your turn ${currentPlayer}`;
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Tic Tac Toe</h1>
        <h2> {showStatus()} </h2>
        <button>Reset Game</button>
      </header>
      <main>
        <Board 
          squares={squares}
          onClickCallback={onClickCallback} 
        />
      </main>
    </div>
  );
};

export default App;
