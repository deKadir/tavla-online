import { createContext, useContext, useEffect, useReducer } from "react";
import GameManager from "./GameManager";
import { ACTION_TYPES } from "./actions";
import { produce } from "immer";
import { initialColumns } from "../utils/game";

const initialValues = {
  turn: "black",
  board: [...initialColumns],
  dice: [],
  hits: [],
  possibleMoves: [],
  selectedItem: null,
};
const GameContext = createContext();

const gameReducer = produce((state, action) => {
  const manager = new GameManager(state);

  switch (action.type) {
    case ACTION_TYPES.SELECT_CHECKER: {
      state.selectedItem = action.checkerId;
      manager.highlightColumns(state.selectedItem);
      return state;
    }
    case ACTION_TYPES.ROLL_DICE: {
      manager.rollDice();
      manager.resetBoardStates();
      manager.calculatePossibleMoves();
      manager.highlightCheckers();
      return manager.state;
    }
    case ACTION_TYPES.MOVE_CHECKER: {
      manager.moveChecker(action.colIndex);
      manager.removeColumnHighligts();
      manager.highlightCheckers();
    }
    default:
      return state;
  }
});

const GameProvider = ({ children }) => {
  const [game, dispatch] = useReducer(gameReducer, initialValues);
  console.log(game);
  const values = {
    game,
    dispatch,
  };

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
};

export const useGameContext = () => useContext(GameContext);

export default GameProvider;
