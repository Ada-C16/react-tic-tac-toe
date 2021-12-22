import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import matthew from './img/matthewface.png';
import junior from './img/juniorface.jpg';

const PLAYER_1 = <img src={matthew} alt="X" />;
const PLAYER_2 = <img src={junior} alt="O" />;
let totalMoves = 0;

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
  const resetCombos = () => {
    return {
      c048: [],
      c012: [],
      c345: [],
      c678: [],
      c036: [],
      c147: [],
      c258: [],
      c642: [],
    };
  };

  const [squares, setSquares] = useState(generateSquares());
  const [player, setPlayer] = useState(true);
  const [winner, setWinner] = useState(null);
  const [trackCombos, setTrackCombos] = useState(resetCombos());

  const updateSquares = (id) => {
    totalMoves++;
    const updatedSquareData = squares.map((row) => {
      return row.map((square) => {
        if (square.id === id) {
          if (player) {
            square.value = PLAYER_1;
            checkForWinner(square.id, square.value);
          } else {
            square.value = PLAYER_2;
            checkForWinner(square.id, square.value);
          }
        }
        return square;
      });
    });

    setSquares(updatedSquareData);
    setPlayer(!player);
  };

  const checkForWinner = (id, value) => {
    for (let key in trackCombos) {
      if (key.includes(id)) {
        trackCombos[key].push(value);

        if (trackCombos[key].length === 3) {
          if (new Set(trackCombos[key]).size === 1) {
            setWinner(value);
          }
        }
        if (totalMoves === 9) {
          setWinner('Tie!');
        }
      }
    }
  };

  const resetGame = () => {
    setSquares(generateSquares());
    setTrackCombos(resetCombos);
    totalMoves = 0;
    setPlayer(true);
    setWinner(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Tic Tac Toebeans</h1>
        <h2>The winner is ... {winner}</h2>
        <button className="button" onClick={resetGame}>
          Start Over
        </button>
      </header>
      <main>
        <Board squares={squares} updateSquares={updateSquares} />
      </main>
    </div>
  );
};

export default App;
