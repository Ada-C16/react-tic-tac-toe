import React from 'react';
import PropTypes from 'prop-types';
const Announcement = ({ gameState }) => {
    if (gameState === 'Ongoing') {
        return <h2>The game is ongoing.</h2>;
    } else if (gameState === 'Tied') {
        return <h2>The game is a tie.</h2>
    } else {
        return <h2>The winner is {gameState}.</h2>
    }
};

Square.propTypes = {
    gameState: PropTypes.string.isRequired,
};

export default Announcement;