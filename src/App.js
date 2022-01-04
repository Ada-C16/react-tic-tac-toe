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
  const [squares, setSquares] = useState(generateSquares());
  const [player, changePlayer] = useState(PLAYER_1);
  let [winner, checkWinner] = useState('');
  // Wave 2

  const checkForWinner = () => {
    let row = 0;
    let column = 0;
    // check for row match
    while (row < 3) {
      if (
        squares[row][0].value === squares[row][1].value &&
        squares[row][2].value === squares[row][1].value &&
        squares[row][0].value != ''
      ) {
        return squares[row][0].value;
      } else row += 1;
    }
    // column check
    while (column < 3) {
      if (
        squares[0][column].value === squares[1][column].value &&
        squares[2][column].value === squares[1][column].value &&
        squares[0][column].value != ''
      ) {
        return squares[0][column].value;
      } else column += 1;
    }
    // diagonal check
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
    } else {
      for (let arr of squares) {
        for (let obj of arr) {
          if (obj.value == '') {
            return '';
          }
          continue;
        }
      }
      return 'Tie';
    }
  };

  const onClickCallback = (id) => {
    let square = squares.map((oneSquareArray) => {
      for (const insideSquare of oneSquareArray) {
        if (insideSquare.id === id && !insideSqaure.value) {
            insideSquare.value = player;
        }
      }
      return oneSquareArray;
    });

    if (winner) {
      !changePlayer();
    }
    if (!winner) {
     changePlayer( if player === PLAYER_1 ? PLAYER_2 : PLAYER_1
    }

    setSquares(square);
    checkWinner(checkForWinner());
  };
  let winnerText = `Winner is ${winner}`;
  // right now you have to click reset button twice to be able to play again
  const resetGame = () => {
    checkWinner('');
    winnerText = `Winner is ${winner}`;
    setSquares(generateSquares());
    changePlayer(PLAYER_1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>{winnerText}</h2>
        <button
          className="reset"
          onClick={() => {resetGame();}}
        >
          Reset Game
        </button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickCallback} />
      </main>
    </div>
  );
};

export default App;
