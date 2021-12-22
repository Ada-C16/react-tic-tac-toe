import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

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
  // This starts state off as a 2D array of JS objects with empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares());
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [winner, setWinner] = useState(null);

  const setSquareValue = (id) => {
    const newSquares = [...squares];

    for (let row of newSquares) {
      for (let square of row) {
        if (square.id === id) {
          if (square.value === '') {
            square.value = currentPlayer;
            if (currentPlayer === PLAYER_1) {
              setCurrentPlayer(PLAYER_2);
            } else {
              setCurrentPlayer(PLAYER_1);
            }
          }
        }
      }
      checkForWinner(newSquares);
      setSquares(newSquares);
    }
  };

  const checkForWinner = (squares) => {
    let newWinner;
    let i = 0;
    while (i < 3) {
      //Horizontal wins
      if (
        squares[i][0].value === squares[i][1].value &&
        squares[i][1].value === squares[i][2].value &&
        // line below checks all horizontal squares are not empty
        squares[i][2].value !== ''
      ) {
        newWinner = squares[i][0].value;

        //Vertical wins
      } else if (
        squares[0][i].value === squares[1][i].value &&
        squares[1][i].value === squares[2][i].value &&
        squares[2][i].value !== ''
      ) {
        newWinner = squares[0][i].value;
      }
      i += 1;
    }

    //Diagonal wins
    if (
      squares[0][0].value === squares[1][1].value &&
      squares[1][1].value === squares[2][2].value &&
      squares[1][1].value !== ''
    ) {
      newWinner = squares[0][0].value;
    } else if (
      squares[0][2].value === squares[1][1].value &&
      squares[1][1].value === squares[2][0].value &&
      squares[1][1].value !== ''
    ) {
      newWinner = squares[0][2].value;
    }

    if (newWinner !== winner) {
      setWinner(newWinner);
    }
  };

  // const resetGame = () => {
  //   // Complete in Wave 4
  // };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>Winner is {winner}</h2>
        <button>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={setSquareValue} />
      </main>
    </div>
  );
};

export default App;
