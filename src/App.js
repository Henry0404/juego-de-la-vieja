import { useState } from "react";
import "./App.css";
import Board from "./components/Board/Board";
import ScoreBoard from "./components/ScoreBoard/ScoreBoard";
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const App = () => {
  const [turno, setTurno] = useState("X");
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [winningSquares, setWinningSquares] = useState([]);
  const [score, setScore] = useState({
    X: 0,
    O: 0,
  });
  const reset = () => {
    setTurno("X");
    setSquares(Array(9).fill(null));
    setWinningSquares([]);
  };
  const checkForWinner = (newSquares) => {
    for (let i = 0; i < winningPositions.length; i++) {
      const [a, b, c] = winningPositions[i];
      if (
        newSquares[a] &&
        newSquares[a] === newSquares[b] &&
        newSquares[a] === newSquares[c]
      ) {
        enGame(newSquares[a], winningPositions[1]);
        //hay un ganador
        return;
      }
    }
    if (!newSquares.includes(null)) {
      enGame(null, Array.from(Array(10).keys()));
      //Empate
      return;
    }
    setTurno(turno === "X" ? "O" : "X");
  };
  const handleClick = (square) => {
    let newSquares = [...squares];
    newSquares.splice(square, 1, turno);
    setSquares(newSquares);
    checkForWinner(newSquares);
  };
  const enGame = (result, winningPositions) => {
    setTurno(null);
    if (result !== null) {
      setScore({
        ...score,
        [result]: score[result] + 1,
      });
    }
    setWinningSquares(winningPositions);
    setTimeout(() => {
      reset();
    }, 2000);
  };
  return (
    <div className="container">
      <Board
        winningSquares={winningSquares}
        turno={turno}
        squares={squares}
        onClick={handleClick}
      />
      <ScoreBoard scoreO={score.O} scoreX={score.X} />
    </div>
  );
};

export default App;
