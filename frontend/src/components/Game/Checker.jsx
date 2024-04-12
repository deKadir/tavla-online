import React from "react";
import { useGameContext, useIsMyTurn } from "../../context/GameProvider";
import { ACTIONS } from "../../context/actions";

const Checker = (checker) => {
  const { game, dispatch } = useGameContext();
  const checkerClass =
    checker.color === "white" ? "checker-light" : "checker-dark";
  return (
    <button
      className={`checker ${checkerClass} `}
      onClick={(e) => {
        dispatch(ACTIONS.selectChecker(checker.id));
        e.stopPropagation();
      }}
      disabled={!checker.hasMove || game.player.color !== game.turn}
    ></button>
  );
};

export default Checker;
