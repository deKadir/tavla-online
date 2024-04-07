import React from "react";
import Column from "../components/Game/Column";
import { useGameContext } from "../context/GameProvider";
import { ACTIONS } from "../context/actions";

const Game = () => {
  const { game, dispatch } = useGameContext();
  console.log(game);

  return (
    <main className="wrapper">
      <div className="board">
        <div className="dice-wrapper">
          <span>{JSON.stringify(game.dice)}</span>
          <button onClick={() => dispatch(ACTIONS.rollDice())}>
            Roll dice
          </button>
        </div>
        {game.board.map(({ index, checkers, canPlay, direction }) => (
          <Column
            key={index}
            turn={game.turn}
            dice={game.dice}
            checkers={checkers}
            canPlay={canPlay}
            index={index}
            direction={direction}
          />
        ))}
      </div>
      <div>users</div>
    </main>
  );
};

export default Game;
