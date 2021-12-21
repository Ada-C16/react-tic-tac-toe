import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

const generateSquares = () => {
  console.log('in generateSquares');
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
  // initialize state
  const [squares, setSquares] = useState(generateSquares());

  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);

  const [winnerLabel, setWinnerLabel] = useState('');

  // Wave 2
  const clickSquare = (mySquare) => {
    for (let i = 0; i < 3; i++) {
      for (let n = 0; n < 3; n++) 
        if (squares[i][n].id == mySquare) {
          if (squares[i][n].value == '') {
            squares[i][n].value = currentPlayer;
          } else {
            return false;
          }
        }
      }
    setSquares([...squares]);

    //Now that we put the mark on the square, check and see if they won by calling checkForWinner()
    let isWon = checkForWinnerChickenDinner();
    if (!isWon) {
      //Now that we put the mark on the square and there is no winner, let's move to the next player
      console.log('currentPlayer is:' + currentPlayer);
      if (currentPlayer == PLAYER_1) {
        setCurrentPlayer(PLAYER_2);
      } else {
        setCurrentPlayer(PLAYER_1);
      }
    } else {
      setWinnerLabel('Winner is ' + currentPlayer.toLowerCase());
    }
  };

  const makeWinningCombos = (n) => {
    let winningArray = [];

    // #make the row winners
    for (let row = 0; row < n; row++) {
      let tmpArray = [];
      for (let col = 0; col < n; col++) {
        tmpArray.push([row, col]);
      }
      winningArray.push(tmpArray);
    }

    //Make the column winners
    for (let col = 0; col < n; col++) {
      let tmpArray2 = [];
      for (let row = 0; row < n; row++) {
        tmpArray2.push([row, col]);
      }
      winningArray.push(tmpArray2);
    }

    //now for the daigs
    let tmpArray3 = [];
    for (let diag = 0; diag < n; diag++) {
      tmpArray3.push([diag, diag]);
    }
    winningArray.push(tmpArray3);

    //now for the diag the other way
    let tmpArray4 = [];
    for (let diag = 0; diag < n; diag++) {
      tmpArray4.push([diag, n - 1 - diag]);
    }
    winningArray.push(tmpArray4);

    return winningArray;
  };

  const checkForWinnerChickenDinner = () => {

    let winningIDCombos = makeWinningCombos(3);

    for (let i = 0; i < winningIDCombos.length; i++) {
      let firstOne =
        squares[winningIDCombos[i][0][0]][winningIDCombos[i][0][1]];
      let secondOne =
        squares[winningIDCombos[i][1][0]][winningIDCombos[i][1][1]];
      let thirdOne =
        squares[winningIDCombos[i][2][0]][winningIDCombos[i][2][1]];

      if (
        firstOne.value == secondOne.value &&
        secondOne.value == thirdOne.value &&
        firstOne.value !== ''
      ) {
        console.log('WE HAVE A WINNER');
        return true;
      }
    }
    return false;
  };

  // resetGame function generates anew board that's empy and updates the state of the squares.
  const resetGame = () => {
    const newGame = generateSquares();
    setSquares(newGame);
    setWinnerLabel('Winner is ');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        {/* return value == current player calculated in checkForWinner */}
        <h2>{winnerLabel}</h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        {/* passing the onClickCallback here; created the  clickSquare function to test it out */}
        <Board squares={squares} onClickCallback={clickSquare} />
      </main>
    </div>
  );
};

export default App;
