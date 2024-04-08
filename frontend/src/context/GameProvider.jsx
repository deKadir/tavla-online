import { createContext, useContext, useReducer } from "react";
import {
  calculateAvailableCheckers,
  highlightColumns,
  initialColumns,
  randomInteger,
  resetBoardStates,
} from "../utils/game";
import { ACTION_TYPES } from "./actions";
import { produce } from "immer";

const initialValues = {
  turn: "black",
  board: [...initialColumns],
  dice: [],
  hits: [],
};
const GameContext = createContext();

const gameReducer = produce((state, action) => {
  switch (action.type) {
    case ACTION_TYPES.SELECT_CHECKER: {
      const colIndex = state.board.findIndex((col) =>
        col.checkers.some((ch) => ch.id === action.id)
      );
      state.board[colIndex].checkers[0].isSelected = true;
      state.board = highlightColumns(state, id);
      return state;
    }
    case ACTION_TYPES.ROLL_DICE: {
      //roll dice
      state.dice = [randomInteger(1, 6), randomInteger(1, 6)];
      state.board = resetBoardStates(state.board);
      //available checkers
      state.board = calculateAvailableCheckers(state);
      return state;
    }
    default:
      break;
  }
});

const GameProvider = ({ children }) => {
  const [game, dispatch] = useReducer(gameReducer, initialValues);
  const values = {
    game,
    dispatch,
  };
  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
};

export const useGameContext = () => useContext(GameContext);

export default GameProvider;
