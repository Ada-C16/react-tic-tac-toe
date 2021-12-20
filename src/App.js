import React, { useEffect, useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';
// generates a 2-dimensional array of squares containing an object with id and value keys
// see output below

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

  const [playerOnesTurn, setTurn] = useState(false);

  // togglesSquares
  const onClickCallback = (id) => {
    let player;

    if (playerOnesTurn) {
      player = PLAYER_1;
    } else {
      player = PLAYER_2;
    }

    const newSquares = [...squares];

    for (let row of newSquares) {
      for (let square of row) {
        if (square.id == id) {
          if (square.value == '') {
            square.value = player;
            setSquares(newSquares);
          }
        }
      }
    }
  };

  const [winner, setWinner] = useState('');

  useEffect(() => {
    setTurn((playerOnesTurn) => !playerOnesTurn);
    const newWinner = checkForWinner(squares);
    if (newWinner != winner) {
      setWinner(newWinner);
    }
  }, [squares]);

  const checkForWinner = (board) => {
    const isDiagonalWinner1 = (coordSet) => {
      return coordSet.has('00') && coordSet.has('11') && coordSet.has('22');
    };

    const isDiagonalWinner2 = (coordSet) => {
      return coordSet.has('20') && coordSet.has('11') && coordSet.has('02');
    };
    let xPlacements = new Set();
    let oPlacements = new Set();

    let blanks = 0;
    let winner = null;

    for (let x in board) {
      let row = board[x];
      if (row[0].value === 'x' || row[0].value === 'o') {
        if (row[0].value === row[1].value && row[0].value === row[2].value) {
          winner = row[0].value;
          return winner;
        }
      }
      for (let y in row) {
        let square = row[y];
        if (square.value === 'x' || square.value === 'o') {
          if (
            board[0][y].value === board[1][y].value &&
            board[0][y].value === board[2][y].value
          ) {
            winner = board[0][y].value;
            return winner;
          }
        }
        if (square.value === 'x') {
          xPlacements.add(x.toString() + y.toString());
          if (
            isDiagonalWinner1(xPlacements) ||
            isDiagonalWinner2(xPlacements)
          ) {
            winner = square.value;
            return winner;
          }
        } else if (square.value === 'o') {
          oPlacements.add(x.toString() + y.toString());

          if (
            isDiagonalWinner1(oPlacements) ||
            isDiagonalWinner2(oPlacements)
          ) {
            winner = square.value;
            return winner;
          }
        } else if (square.value === '') {
          blanks++;
        }
      }
    }
    if (!winner && blanks === 0) {
      return 'Tie';
    }
    return winner;
  };
  // Complete in Wave 3
  // You will need to:
  // 1. Go accross each row to see if
  //    3 squares in the same row match
  //    i.e. same value
  // 2. Go down each column to see if
  //    3 squares in each column match
  // 3. Go across each diagonal to see if
  //    all three squares have the same value.
  // };

  const resetGame = () => {
    // Complete in Wave 4
    setSquares(generateSquares());
    setTurn(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>Winner is {winner}</h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickCallback} />
      </main>
    </div>
  );
};

export default App;
