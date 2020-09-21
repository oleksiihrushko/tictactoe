import React from "react";

const NoWinModal = ({ startNew, xWins, oWins }) => {
  return (
    <div className="winModal">
      <h2>{"Nobody wins"}</h2>
      <h3>{"Game score is " + xWins + ":" + oWins + " (Player:AI)"}</h3>
      <button className="button" onClick={startNew}>
        Start new game
      </button>
    </div>
  );
};

export default NoWinModal;
