import React, { useEffect, useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER1 = 'X';
const PLAYER2 = 'O';

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
  const [squares, setSquares] = useState(generateSquares());
  const [turn, setTurn] = useState('X');
  const [winner, setWinner] = useState(null);

  const toggleTurn = () => {  
    if (turn === 'X'){
      setTurn('O');
    } else {
      setTurn('X');
    }
  };


  const onClickCallback = (id) => {
    const newSquares = squares.map( (row) => {
      row.map((square) => {
        if (square.id === id && square.used !== true) {
          const newValue = {value: turn,
                            used: true};
          let newSquare = Object.assign(square, newValue);
         return newSquare;
        }
        return square;
      });
      return row;
    });
    setSquares(newSquares);
    toggleTurn();
    if (checkForWinner()) {
      const newSquares = squares.map( (row) => {
        row.map((square) => {
          const newValue = {used: true};
          let newSquare = Object.assign(square, newValue);
          return newSquare;

        });
        return row;
      });
      setSquares(newSquares);
      setWinner(checkForWinner());
    }


  };
  
  const checkForWinner = () => {
    let i = 0;
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
    setSquares(generateSquares());
    setTurn('X');
    setWinner(null);
  };

  

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Tic Tac Toe</h1>
        {winner ?  <h2>Winner is: {winner}</h2> : <h2>Current Player {turn}</h2> }        
        <button onClick={() =>resetGame()}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickCallback}/>
      </main>
    </div>
  );
};

export default App;