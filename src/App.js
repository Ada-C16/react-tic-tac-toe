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
  // make sure to put all your hooks at the top of your component!!!
  const [squares, setSquares] = useState(generateSquares());
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [winner, setWinner] = useState(null);

  const changeCurrentPlayer = () => {
    if (currentPlayer === PLAYER_1) {
      setCurrentPlayer(PLAYER_2);
    } else {
      setCurrentPlayer(PLAYER_1);
    }
  };

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

  const updateBoard = (id) => {
    const updatedSquares = [...squares];

    for (const nestedArr of squares) {
      for (const currentSquare of nestedArr) {
        if (
          currentSquare.id === id &&
          currentSquare.value === '' &&
          checkForWinner() === null
        ) {
          currentSquare.value = currentPlayer;
        }
      }
    }

    // update the board
    setSquares(updatedSquares);

    // either declare the winner or change the current player
    checkForWinner() ? setWinner(currentPlayer) : changeCurrentPlayer();
  };

  const resetGame = () => {
    setSquares(generateSquares());
    setWinner(null);
    setCurrentPlayer(PLAYER_1);
  };

  // this returns a bunch of HTML-looking JavaScript (JSX),
  // including the board as well as other pieces
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        {/* if there's a winner, show winner is... msg; else show player is... msg  */}
        {winner ? (
          <h2>Winner is {winner}</h2>
        ) : (
          <h2>Player is {currentPlayer}</h2>
        )}
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        {/* // to board, provide a squares prop and an onClickCallBack prop 
        so the app parent knows what to do if the board child updates */}
        <Board squares={squares} onClickCallback={updateBoard} />
      </main>
    </div>
  );
};

export default App;
