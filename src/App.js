import React, { useState } from 'react';
import './App.css';

import Board from './components/Board';

const PLAYER_1 = 'x';
const PLAYER_2 = 'o';

const generateSquares = () => {
  // builds the structure (state of our board)
  // creating rows and columns using for loops and nested structures.
  // each object within the nestes lists is a representation of one square.
  // each object (square) has an id and value.
  const squares = [];

  let currentId = 0;

  // says to loop 3 times. for 3 times, add a new inner array.
  for (let row = 0; row < 3; row += 1) {
    // getting pushed into array squares.
    squares.push([]);
    // loop 3 times.
    for (let col = 0; col < 3; col += 1) {
      // pushing an object with an id and value.
      // id starts at 0 and increases by 1 every time we add a new object to our nested structure.
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
  // sqaures is the name of the variable we are using to store state.
  // The value we are using to initialize useState is the result of calling generateSquares().
  // This starts state off as a 2D array of JS objects with
  // empty value and unique ids.
  const [squares, setSquares] = useState(generateSquares()); // if the parentheses are removed from the function call, it will still work, because if the value is a function reference, then React will call the function the first time we need to initialize state, but every time after that it won't call the function. It can tell the difference between a function and not a function, so technically the no parentheses is a little bit more efficient, because they call the function every time, building a new 2D array pass it into useState the first time and ignore it everytime after that, but we will have called generateSquares ourselves every time. Without parentheses, we give it a function reference to generate squares and React will just call that function only the first timr and use the return value as an initial vlaue for the state.
  const [player, setPlayer] = useState(PLAYER_1);

  // Wave 2
  // You will need to create a method to change the square
  //   When it is clicked on.
  //   Then pass it into the squares as a callback
  const onClickCallback = (id) => {
    // variable 'move' flag for valid move
    let move = false;
    const updateSquares = squares.map((row) =>
      row.map((pos) => {
        if (pos.id !== id || pos.value !== '') {
          return pos;
        }

        // valid move if passes all checks
        move = true;

        // create new array that includes played square(s)
        const playedSquare = { ...pos, value: player };
        return playedSquare;
      })
    );

    // if valid move, state for squares and player updates
    if (move) {
      setSquares(updateSquares);
      // ternary swithes player state
      setPlayer(player === PLAYER_1 ? PLAYER_2 : PLAYER_1);
    }
  };

  const checkForWinner = () => {
    let i = 0;
    // Check all the rows and columns for a winner by doing 2D indexing.
    // have to check all straight across, down, and diagonal positions or if any of the winning positions are blank to find a winner.
    // the winning positions much all be equal and not an empty string (blank square).
    while (i < 3) {
      if (
        // checking rows (row value is the same on each check while the column shifts)
        squares[i][0].value === squares[i][1].value &&
        squares[i][2].value === squares[i][1].value &&
        // this checks if it is an 'x' or 'o' not an empty string ''.
        squares[i][0].value !== ''
      ) {
        return squares[i][0].value;
      } else if (
        // checking columns (column remains the same on each check while the row shifts)
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

    // if no winner is found (can possibly use this to detect a tie or return tied game)
    return null;
  };

  const resetGame = () => {
    // Complete in Wave 4
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>React Tic Tac Toe</h1>
        <h2>The winner is ... -- Fill in for wave 3 </h2>
        <button>Reset Game</button>
      </header>
      <main>
        {/* properties being passed. React is going to take this and anything that we've put as attrs it's going to make a new dict of values and each of the attr names is going to become a key and the value is the JS expression in the curly braces (state variable) */}
        {/* no matter how many properties we have listed when we call a component, it all gets packaged up into one dictionary, where the keys match the names of the attrs. */}
        <Board squares={squares} onClickCallback={onClickCallback} />
      </main>
    </div>
  );
};
export default App;
