import React from 'react';

const Login = () => {
  return (
    <form>
      <div>
        <label htmlFor="player1">Player X name: </label>
        <input type="text" id="player1" />
      </div>
      <div>
        <label htmlFor="player2">Player O name: </label>
        <input type="text" id="player2" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
