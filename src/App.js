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
  // Should have a board with 9 squares
  // App -> Board -> [Square, Square, Square, Square, Square, Square, Square, Square, Square]
  const [squares, setSquares] = useState(generateSquares());
  const [winner, setWinner] = useState(null);
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
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

  const onClickCallback = (id) => {
    setSquares((squares) => {
      let newBoard = squares.map((square)=>{
        for (let property of square){
          if (property.id === id && property.value === ''){
            if (currentPlayer === PLAYER_1){
              property.value = PLAYER_1;
            } else if (currentPlayer === PLAYER_2){
              property.value = PLAYER_2;
            }
          }
        }
        return square;  
      });
      // Check for winner
      setWinner(checkForWinner());
      return newBoard;
    });
    if (currentPlayer === PLAYER_1){
      setCurrentPlayer(PLAYER_2);
    } else {
      setCurrentPlayer(PLAYER_1);
    }
  };

  const onClickCallback = (id) => {
    setSquares((squares) => {
      let newBoard = squares.map((square)=>{
        for (let property of square){
          if (property.id === id && property.value === ''){
            if (currentPlayer === PLAYER_1){
              property.value = PLAYER_1;
            } else if (currentPlayer === PLAYER_2){
              property.value = PLAYER_2;
            }
          }
        }
        return square;
      });
      // Check for winner
      return newBoard;
    });
    if (currentPlayer === PLAYER_1){
      setCurrentPlayer(PLAYER_2);
    } else {
      setCurrentPlayer(PLAYER_1);
    }
  };



  const resetGame = () => {
    // Complete in Wave 4
    setSquares(generateSquares());
    setWinner(null);
    setCurrentPlayer(PLAYER_1);
  };

  let header;
  let boardCallback;
  if (winner != null) {
    header = <h2>Winner is {winner}</h2>;
  } else {
    header = <h2>The Current Player is {currentPlayer}</h2>;
    boardCallback = onClickCallback;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        {header}
        <button onClick = {resetGame} >Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={boardCallback}/>
      </main>
    </div>
  );
};

export default App;

  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback
  // You will need to find the square with the id
  //  and change it's value to the current player
  //  (X or O)
  //  Then set the state of the square to the new value
  //  and set the state of the board to the new value
  //  of the square
  // Complete in Wave 3
  // You will need to:
  // 1. Go accross each row to see if
  //    3 squares in the same row match
  //    i.e. same value
  // 2. Go down each column to see if
  //    3 squares in each column match
  // 3. Go across each diagonal to see if
  //    all three squares have the same value.