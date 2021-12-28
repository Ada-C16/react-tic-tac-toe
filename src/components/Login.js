import React from 'react';
import { useState } from 'react';

const Login = () => {
  const [formFields, setFormFields] = useState({
    userName1: '',
    userName2: '',
  });

  const onPlayer1NameChange = (event) => {
    setFormFields({
      ...formFields,
      userName1: event.target.value,
    });
  };

  const onPlayer2NameChange = (event) => {
    setFormFields({
      ...formFields,
      userName2: event.target.value,
    });
  };

  return (
    <form>
      <div>
        <label htmlFor="player1">Player X name: </label>
        <input
          userName1="player1Name"
          value={formFields.userName1}
          onChange={onPlayer1NameChange}
          type="text"
          id="player1"
        />
      </div>
      <div>
        <label htmlFor="player2">Player O name: </label>
        <input
          userName2="player2Name"
          value={formFields.userName2}
          onChange={onPlayer2NameChange}
          type="text"
          id="player2"
        />
      </div>
      <button type="submit" value="Add Player Name">
        Submit
      </button>
    </form>
  );
};

export default Login;
