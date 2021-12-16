// import { PROPERTY_TYPES } from '@babel/types';
import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';
// let currentPlayer = PLAYER_1;
// let message = 'Current player is: x';
// let isGameRunning = true;
// const clickedSquares = [];

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
  const [message, setMessage] = useState('Current player is: x');
  const [currentPlayer, setCurrentPlayer] = useState(PLAYER_1);
  const [isGameRunning, setIsGameRunning] = useState(true);

  // ****tried but said push and length not functions
  const [squareClicked, setSquareClicked] = useState([]);


  // Wave 2


  const squaresCopy = [...squares];


  const onClickCallback = (key) => {
    if (!isGameRunning){
      return;
    }

    // adds cant click on same square feature successfully but makes all other tests not pass
    // for (let i=0; i<clickedSquares.length; i++){
    //   if (key === clickedSquares[i]){
    //     return;
    //   }
    // }

    // ****tried but said push and length not functions

    for (let i=0; i<squareClicked.length; i++){
      if (key === squareClicked[i]){
        return;
      }
    }
    
    
    console.log(key);

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (squaresCopy[i][j].id == key) {
          setSquareClicked(squareClicked.concat(key));
          console.log(squareClicked);
          squaresCopy[i][j].value = currentPlayer;
          if (currentPlayer === PLAYER_1) {
            setCurrentPlayer(PLAYER_2);
            setMessage(`Current player is: ${PLAYER_2}`);
          } else if (currentPlayer === PLAYER_2) {
            setCurrentPlayer(PLAYER_1);
            setMessage(`Current player is: ${PLAYER_1}`);
          }

          // console.log(squares[i][j].value);
        }
        
      }
    }
    const winner = checkForWinner();
    if (winner === 'x' || winner === 'o') {
      console.log('winner is', winner);
      // console.log(message);
      setMessage(`Winner is ${winner}`);
      // console.log(message);
      setIsGameRunning(false);
    }
    if (squareClicked.length === 8){
      setMessage('The game ended with no winner. Click the reset button to play again');
      setIsGameRunning(false);
    }
    




    // squaresCopy[0][0].value = 'x';
    // console.log(squaresCopy[0][0].value);

    // console.log(squares[0][0].id);
    setSquares(squaresCopy);



    // make a copy of all the squares
    // iterate through all the squares to see if their id matches the one clicked (parameter x)


    // iterate through all the sqaure and check for their id's and if id matches the one that came back from sqaure then put x or 0
    // x = data being sent from square to app (which square was clicked)
    //determine what data need from square and then what do with that info-(game logic like put x or 0, end or continue game)
    // ID data=more useful than just props.value
  };


  // const yesClicked = () => {

  //   // className
  //   // setClickedOn((current) => current + 1);

  //   // console.log(clickedOn);
  // };

  // const printMessage = () => {

  //   console.log('Now, we\'re in printMessage!');
  // };

  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback

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

  const resetGame = () => {
    // Complete in Wave 4
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        squaresCopy[i][j].value = ''; 
      }
    }
    setSquares(squaresCopy);
    setCurrentPlayer(PLAYER_1);
    setMessage(`Current player is: ${PLAYER_1}`);
    setSquareClicked([]);
    setIsGameRunning(true);
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>React Tic Tac Toe</h1>
        <h2>{message}</h2>
        <button onClick={resetGame}>Reset Game</button>
      </header>
      <main>
        <Board onClickCallback={onClickCallback} squares={squares} />
      </main>
    </div>
  );
};

export default App;
