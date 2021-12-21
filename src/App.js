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
  console.log(`${squares[0][1].value}`);

  // create state var for players
  const [currentPlayer, setNextPlayer] = useState(PLAYER_1);

  // keeps track of the winner, who clicks what, etc.
  const onClickCallback = (id) => {
    // copy the squares array to newBoard
    const newBoard = [...squares];

    newBoard.map((squareArray) => {
      // looping through the square array, get each square object..
      return squareArray.map((square) => {
        if (square.id === id && square.value === '') {
          // check if current player is X or O
          if (currentPlayer === PLAYER_1) {
            square.value = PLAYER_1;
            setNextPlayer(PLAYER_2);
          } else {
            square.value = PLAYER_2;
            setNextPlayer(PLAYER_1);
          }
        }
      });
    });
    setSquares(newBoard);
  };

  const helperHorizontal = (squares) => {
    for (let row of squares) {
      let counter = 0;
      let getFirstElement = row[0].value;
      for (let col = 1; col < row.length; col++) {
        if (row[col].value === getFirstElement && getFirstElement != '') {
          counter += 1;
        }
      }
      if (counter === row.length - 1) {
        return getFirstElement;
      }
    }
    return 'Tie';
  };
  const helperVertical = (squares) => {
    let firsts = squares[0][0].value;
    let row = 0;
    let col = 0;
    let counter = 0;

    while (row < squares.length && col < squares.length) {
      if (squares[row][col].value === firsts && firsts != '') {
        counter += 1;
        row += 1;
        if (squares.length === counter) {
          return firsts;
        }
      } else {
        row = 0;
        counter = 0;
        col += 1;
        if (col <= 2) {
          firsts = squares[row][col].value;
        }
      }
    }
    return 'Tie';
  };

  const helperDiagonal = (squares) => {
    const rightLeft = squares[0][0].value;
    let counter1 = 0;
    const leftRight = squares[0][2].value;
    let counter2 = 0;
    let col = squares.length - 1;

    for (let index in squares) {
      if (squares[index][index].value === rightLeft && rightLeft != '') {
        counter1 += 1;
        if (counter1 === squares.length) {
          return rightLeft;
        }
      }
      if (squares[index][col].value === leftRight && leftRight != '') {
        counter2 += 1;
        col -= 1;
        if (squares.length === counter2) {
          return leftRight;
        }
      }
    }
    return 'Tie';
  };

  const checkForWinner = (squares) => {
    if (
      helperHorizontal(squares) === 'x' ||
      helperVertical(squares) === 'x' ||
      helperDiagonal(squares) === 'x'
    ) {
      return 'x';
    }
    if (
      helperHorizontal(squares) === 'o' ||
      helperVertical(squares) === 'o' ||
      helperDiagonal(squares) === 'o'
    ) {
      return 'o';
    }
    for (let row of squares) {
      if ('' in row) {
        return 'None';
      }
    }
    if (
      helperHorizontal(squares) === 'Tie' ||
      helperVertical(squares) === 'Tie' ||
      helperDiagonal(squares) === 'Tie'
    ) {
      return 'Tie';
    }
  };

  const resetGame = () => {
    const newBoard = generateSquares();
    setSquares(newBoard);
  };

  const checkAllSquares = (squares) => {
    for (let row of squares) {
      for (let col of row) {
        if (col.value === '') {
          return;
        }
      }
    }
    checkForWinner(squares);
  };

  checkAllSquares(squares);
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>Winner is {checkForWinner(squares)} </h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board squares={squares} onClickCallback={onClickCallback} />
      </main>
    </div>
  );
};

export default App;
