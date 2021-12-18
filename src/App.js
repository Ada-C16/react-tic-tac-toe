import React, { useEffect, useState } from 'react';
import './App.css';
import Board from './components/Board';

const PLAYER_1 = 'X';
const PLAYER_2 = 'O';

const generateSquares = () => {
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
  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.

  const [squares, setSquares] = useState(generateSquares());
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [winner, setWinner] = useState(null);

  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback
  const changeCurrentPlayer = () => {
    if (currentPlayer === PLAYER_1) {
      setCurrentPlayer(PLAYER_2);
    } else {
      setCurrentPlayer(PLAYER_1);
    }
  };

  const changeTheSquare = (id) => {
    const updateSquare = squares.map((square) => {
      for (const innerSquare of square) {
        if (innerSquare.id === id) {
          innerSquare.value = currentPlayer;
          innerSquare.disabled = true;
          setCurrentPlayer(changeCurrentPlayer);
        }
      }
      return square;
    });
    setSquares(updateSquare);
    setWinner(checkForWinner(squares));
    // if (!winner) {
    //   disableSquares();
    // }
  };

  // const disableSquares = () => {
  //   const updateSquare = squares.map((square) => {
  //     for (const innerSquare of square) {
  //       innerSquare.disabled = true;
  //     }
  //   });
  //   setSquares(updateSquare);
  // };

  // useEffect(() => {
  //   console.log('working');
  //   disableSquares();
  // }, [winner]);

  const boardToSets = (board) => {
    let nestedList = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];

    for (let i = 0; i < 3; i++) {
      for (let k = 0; k < 3; k++) {
        nestedList[i][k] = board[i][k].value;
      }
    }

    const sets = [];

    let diag1 = new Set();
    let diag2 = new Set();
    for (let i = 0; i < 3; i++) {
      // across
      sets.push(new Set(nestedList[i]));

      // diagonal
      diag1.add(nestedList[i][i]);
      diag2.add(nestedList[i][2 - i]);

      // down
      let newSet = new Set();
      for (let k = 0; k < 3; k++) {
        newSet.add(nestedList[k][i]);
      }
      sets.push(newSet);
    }
    sets.push(diag1);
    sets.push(diag2);
    return sets;
  };

  const checkForWinner = (board) => {
    let sets = boardToSets(board);

    // check if there are winners
    for (let line of sets) {
      if (line.size === 1) {
        let w = line.values().next().value;
        if (w) {
          return `${w} wins!`;
          // need to disable the board too
        }
      }
    }

    // check if there are empty spaces left
    for (let line of sets) {
      if (line.has('')) {
        return null;
      }
    }

    // if there are no winners and no empty spaces, it's a tie
    return 'tie game';
  };

  const resetGame = () => {
    // Complete in Wave 4
    setSquares(generateSquares());
    setCurrentPlayer(PLAYER_1);
    setWinner(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        {/* Need to change this to say who'se turn it is*/}
        <h2>{winner ? winner : `${currentPlayer}'s turn`}</h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={changeTheSquare} />
      </main>
    </div>
  );
};

export default App;
