import React, { useState } from "react";
import { calculateWinner } from "../helper";
import Board from "./Board";
import NoWinModal from "./NoWinModal";
import WinModal from "./WinModal";

const App = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXisNext] = useState(true);
  const winner = calculateWinner(history[stepNumber]);
  const xO = xIsNext ? "X" : "O";
  const [xWins, setXwins] = useState(0);
  const [oWins, setOwins] = useState(0);
  const [aiMove, setAiMove] = useState(false);

  const handleClick = (i) => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    // return if won or occupied
    if (winner || squares[i]) return;
    // select square
    squares[i] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
    !checkAllOcupated(squares) && setAiMove(true);
  };

  const AI_move = () => {
    const historyPoint = history.slice(0, stepNumber + 1);
    const current = historyPoint[stepNumber];
    const squares = [...current];
    // return if won
    if (winner) return;
    let move;
    do {
      move = Math.floor(Math.random() * 9);
    } while (squares[move] !== null);
    // select square
    squares[move] = xO;
    setHistory([...historyPoint, squares]);
    setStepNumber(historyPoint.length);
    setXisNext(!xIsNext);
    setAiMove(false);
  };

  const checkAllOcupated = (squares) => {
    let curr_squares;
    if (squares) {
      curr_squares = squares;
    } else {
      const historyPoint = history.slice(0, stepNumber + 1);
      const current = historyPoint[stepNumber];
      curr_squares = [...current];
    }
    return !curr_squares.includes(null) && curr_squares;
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXisNext(step % 2 === 0);
  };

  const restart = () => {
    if (winner) {
      aiMove ? setXwins(xWins + 1) : setOwins(oWins + 1);
    }
    setHistory([Array(9).fill(null)]);
    setStepNumber(0);
    setXisNext(!xIsNext);
  };

  const renderMoves = () =>
    history.map((_step, move) => {
      const destination = move ? `Go to move #${move}` : "Go to Start";
      return (
        <li key={move}>
          <button onClick={() => jumpTo(move)}>{destination}</button>
        </li>
      );
    });

  return (
    <>
      <h1>Tic Tac Toe</h1>
      <Board squares={history[stepNumber]} onClick={handleClick} />
      <div className="info-wrapper">
        <div>
          <h3>History</h3>
          {aiMove && AI_move()}
          {renderMoves()}
        </div>
        <div>
          <h3>{winner ? "Winner: " + winner : "Next Player: " + xO}</h3>
          <h3>
            {winner
              ? aiMove
                ? "Score = " + (xWins + 1) + ":" + oWins + " (Player:AI)"
                : "Score = " + xWins + ":" + (oWins + 1) + " (Player:AI)"
              : "Score = " + xWins + ":" + oWins + " (Player:AI)"}
          </h3>
        </div>
      </div>
      {winner && (
        <WinModal
          aiMove={aiMove}
          startNew={restart}
          oWins={oWins}
          xWins={xWins}
        />
      )}
      {checkAllOcupated() && !winner && (
        <NoWinModal startNew={restart} oWins={oWins} xWins={xWins} />
      )}
    </>
  );
};

export default App;
