import { createContext, useContext, useReducer } from "react";
import BlackManager from "./BlackManager";
import WhiteManager from "./WhiteMaganer";
import { ACTION_TYPES } from "./actions";
import { produce } from "immer";
import { initialColumns } from "../utils/game";
import CheckerBlack from "./CheckerBlack";
import CheckerWhite from "./CheckerWhite";

const initialValues = {
  turn: "black",
  board: [...initialColumns],
  dice: [],
  hits: [],
  moves: [],
  selectedItem: null,
};
const GameContext = createContext();

const gameReducer = produce((state, action) => {
  let manager = null;
  let checker = null;
  if (state.turn === "black") {
    checker = new CheckerBlack();
    manager = new BlackManager(state, checker);
  } else {
    checker = new CheckerWhite();
    manager = new WhiteManager(state, checker);
  }

  switch (action.type) {
    case ACTION_TYPES.SELECT_CHECKER: {
      // state.selectedItem = action.checkerId;
      console.log("select run");
      manager.selectChecker(action.checkerId);
      return manager.state;
    }
    case ACTION_TYPES.ROLL_DICE: {
      manager.rollDice();
      manager.setMoves();
      manager.calculateMoves();
      return manager.state;
    }
    case ACTION_TYPES.MOVE_CHECKER: {
      manager.moveChecker(action.colIndex);
      console.log("move run");
      return manager.state;
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
