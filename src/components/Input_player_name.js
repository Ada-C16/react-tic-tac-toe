import React, { useState } from 'react';

const Input = () => {
  const [playerName, setPlayerName] = useState('');
  return (
    <div>
      <input type="text" placeholder="player1 name" value={playerName}></input>
      <input type="text" placeholder="player2 name" value={playerName}></input>
    </div>
  );
};

Input.propTypes = {};

export default Input;
