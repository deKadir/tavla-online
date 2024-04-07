import React from "react";
import { useGameContext } from "../../context/GameProvider";
import { ACTIONS } from "../../context/actions";

const Checker = (checker) => {
  const { dispatch } = useGameContext();
  const checkerClass =
    checker.color === "white" ? "checker-light" : "checker-dark";

  return (
    <button
      className={`checker ${checkerClass} `}
      onClick={() => dispatch(ACTIONS.selectChecker(checker.id))}
      disabled={!checker.hasMove}
    ></button>
  );
};

export default Checker;
