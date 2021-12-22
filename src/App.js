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

  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback

  const setSquareValue = (id) => {
<<<<<<< HEAD
    console.log(id);
=======
    // console.log(id);
>>>>>>> 7b720bdfe8cee2925a5b7d184d0294243f8770fc
    const newSquares = [...squares];
    // console.log(squares);

    for (let row of newSquares) {
      for (let square of row) {
        if (square.id === id) {
          // console.log(square);
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
<<<<<<< HEAD
        console.log('Inside CheckForWinner!');
=======
        // console.log('Inside CheckForWinner!');
>>>>>>> 7b720bdfe8cee2925a5b7d184d0294243f8770fc
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
    // setWinner('Tie');
  };

  // const resetGame = () => {
  //   // Complete in Wave 4
  // };

  // checkForWinner();
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
