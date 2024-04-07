import React, { useState } from "react";
import Column from "../components/Game/Column";
let id = 1;
const checker = (color) => {
  return {
    id: id++,
    color,
  };
};
const generateCheckers = (color, length = 0) => {
  const checkers = Array.from({ length }).map(() => checker(color));
  return {
    canPlay: false,
    checkers,
  };
};

const columns = [
  { ...generateCheckers("black", 2) },
  {},
  {},
  {},
  {},
  { ...generateCheckers("white", 5) },
  {},
  { ...generateCheckers("white", 3) },
  {},
  {},
  {},
  { ...generateCheckers("black", 5) },
  { ...generateCheckers("white", 5) },
  {},
  {},
  {},
  { ...generateCheckers("black", 3) },
  {},
  { ...generateCheckers("black", 5) },
  {},
  {},
  {},
  {},
  { ...generateCheckers("white", 2) },
];
const Game = () => {
  const [board, setBoard] = useState(columns);

  return (
    <main className="wrapper">
      <div className="board">
        {board.map(({ checkers = [], canPlay = false }, key) => (
          <Column checkers={checkers} canPlay={canPlay} index={key + 1} />
        ))}
      </div>
      <div>users</div>
    </main>
  );
};

export default Game;
