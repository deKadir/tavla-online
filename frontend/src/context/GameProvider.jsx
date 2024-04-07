import { createContext, useContext, useReducer } from "react";
import { initialColumns, randomInteger } from "../utils/game";
import { ACTION_TYPES } from "./actions";
import { produce } from "immer";

const initialValues = {
  turn: "black",
  board: [...initialColumns],
  dice: [],
  possibleMoves: [],
};
const GameContext = createContext();

const gameReducer = produce((state, action) => {
  switch (action.type) {
    case ACTION_TYPES.CLICK_CHECKER: {
      return state;
    }
    case ACTION_TYPES.ROLL_DICE: {
      state.dice = [randomInteger(1, 6), randomInteger(1, 6)];
      state.possibleMoves = [...state.dice, state.dice[0] + state.dice[1]];
      state.board = state.board.map((col) => {
        const isMyCol = col.checkers?.[0]?.color === state.turn;

        if (!isMyCol) {
          return col;
        }
        state.possibleMoves.forEach((mv) => {
          const nextIndex = mv + col.index;
          if (nextIndex > state.board.length - 1) {
            return;
          }
          console.log(nextIndex);
          const nextCol = state.board[nextIndex];
          if (
            !nextCol.checkers.length ||
            nextCol.checkers[0].color === state.turn
          ) {
            col.checkers[0].hasMove = true;
          }
        });
        return col;
      });
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
