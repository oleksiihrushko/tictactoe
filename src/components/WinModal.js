import React from "react";

const WinModal = ({ aiMove, startNew, xWins, oWins }) => {
  return (
    <div className="winModal">
      <h2>{`Winner is ${aiMove ? "Player" : "AI"} !`}</h2>
      <h3>
        {aiMove
          ? "Game score is " + (xWins + 1) + ":" + oWins + " (Player:AI)"
          : "Game score is " + xWins + ":" + (oWins + 1) + " (Player:AI)"}
      </h3>
      <button className="button" onClick={startNew}>
        Start new game
      </button>
    </div>
  );
};

export default WinModal;
