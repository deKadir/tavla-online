import React from "react";
import Column from "../components/Game/Column";
import { useGameContext } from "../context/GameProvider";
import { ACTIONS } from "../context/actions";
import Checker from "../components/Game/Checker";

const Game = () => {
  const { game, dispatch } = useGameContext();

  return (
    <main className="wrapper">
      <div className={`board`}>
        <div className="collect">
          <div
            className={`collect-white ${
              game.canCollect && game.turn === "white"
                ? "highlight-collect"
                : ""
            }`}
            onClick={() => dispatch(ACTIONS.collectChecker())}
          >
            {game.collects
              .filter((clt) => clt.color === "white")
              .map(() => (
                <div className="collect-item white" />
              ))}
          </div>
          <div
            className={`collect-black ${
              game.canCollect && game.turn === "black"
                ? "highlight-collect"
                : ""
            }`}
            onClick={() => dispatch(ACTIONS.collectChecker())}
          >
            {game.collects
              .filter((clt) => clt.color === "black")
              .map(() => (
                <div className="collect-item black" />
              ))}
          </div>
        </div>
        <div
          className={`dice-wrapper ${game.turn === "black" ? "left" : "right"}`}
        >
          <span>{JSON.stringify(game.dice)}</span>
          <button onClick={() => dispatch(ACTIONS.rollDice())}>
            Roll dice
          </button>
        </div>
        <div className="hits-wrapper">
          {game.hits.map((hit) => (
            <Checker {...hit} key={hit.id} />
          ))}
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
