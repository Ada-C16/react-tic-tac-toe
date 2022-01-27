import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

const WINFORMATIONS = [
  // Rows
  [[0,0], [0,1], [0,2]],
  [[1,0], [1,1], [1,2]],
  [[2,0], [2,1], [2,2]],
  // Cols
  [[0,0], [1,0], [2,0]],
  [[0,1], [1,1], [2,1]],
  [[0,2], [1,2], [2,2]],
  // Diagonals
  [[0,0], [1,1], [2,2]],
  [[0,2], [1,1], [2,0]],
];

const generateSquares = () => {
  // Creates array of current squares
  const squares = [];

  let currentId = 0;

  for (let row = 0; row < 3; row += 1) {
    squares.push([]);
    for (let col = 0; col < 3; col += 1) {
      squares[row].push({
        id: currentId,
        value: '',
        disabled: false,
      });
      currentId += 1;
    }
  }
  return squares;
};

const App = () => {
  const [squares, setSquares] = useState(generateSquares());
  const [turn, setTurn] = useState(PLAYER_1);
  const [winner, setWinner] = useState(null);

  const togglePlayerTurn = () => {
    // Toggles turn between player 'x' and 'o'
    let newTurn = '';
    if (turn === PLAYER_1) {
      newTurn = PLAYER_2;
    } else {
      newTurn = PLAYER_1;
    }
    setTurn(newTurn);
  };

  const onClickCallback = (squareId) => {
    // Updates squares state with latest action
    const newSquares = [...squares];
    newSquares.forEach((row) => {
      row.forEach((square) => {
        if (square.id === squareId && square.value === '') {
          square.value = turn;
        }
      });
    });
    setSquares(newSquares);
    setWinner(checkForWinner());
    togglePlayerTurn();

    let someoneWon = checkForWinner();
    if (someoneWon) {
      setWinner(someoneWon);
      // If winner, disable all squares
      squares.forEach((row) => {
        row.map((square) => {
          if (square.value == '') {
            square.disabled = true;
          }
        });
      });
    }
  };

  const checkForWinner = () => {  
    // Checks current board for a winner
    let winner = null;

    // Examine each winning formation as it applys to current board
    for (let win of WINFORMATIONS) {
      let current = new Set();
      // Create a winning formation set from reference indicies 
      for (let idx of win) {
        current.add(squares[idx[0]][idx[1]].value);
      }
      // If set contains one type, that is not '', we have a winner
      if (current.size == 1 && current.values().next().value != '') {
        winner = current.values().next().value;
      }
    }
    // If board has '', game in progress
    for (let row of squares) {
      for (let col of row) {
        if (col.value == '') {
          return winner;
        }
      }
    }
    
    // If no '' present and no winner, game is tie
    return 'tie';
  };


  const resetGame = () => {
    // Clears board for new game
    setSquares(generateSquares());
    setTurn(PLAYER_1);
    setWinner(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>Winner is {winner}</h2>
        <button className='reset' onClick={resetGame}>Reset Game</button>
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
