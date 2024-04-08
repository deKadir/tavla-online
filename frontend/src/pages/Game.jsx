import React from "react";
import Column from "../components/Game/Column";
import { useGameContext } from "../context/GameProvider";
import { ACTIONS } from "../context/actions";

const Game = () => {
  const { game, dispatch } = useGameContext();

  return (
    <main className="wrapper">
      <div className="board">
        <div className="dice-wrapper">
          <span>{JSON.stringify(game.dice)}</span>
          <button onClick={() => dispatch(ACTIONS.rollDice())}>
            Roll dice
          </button>
        </div>
        {/* Top */}
        {game.board
          .slice(0, 12)
          .map(({ index, checkers, canPlay, direction, highlight }) => (
            <Column
              key={index}
              turn={game.turn}
              dice={game.dice}
              checkers={checkers}
              canPlay={canPlay}
              index={index}
              direction={direction}
              highlight={highlight}
            />
          ))}
        {/* bottom */}
        {game.board
          .slice(12, 24)
          .reverse()
          .map(({ index, checkers, canPlay, direction, highlight }) => (
            <Column
              key={index}
              turn={game.turn}
              dice={game.dice}
              checkers={checkers}
              canPlay={canPlay}
              index={index}
              highlight={highlight}
              direction={direction}
            />
          ))}
      </div>
      <div>users</div>
    </main>
  );
};

export default Game;
