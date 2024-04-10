import { createContext, useContext, useReducer } from "react";
import PlayerManager from "./PlayerManager";
import { ACTION_TYPES } from "./actions";
import { produce } from "immer";
import { initialColumns } from "../utils/game";

const initialValues = {
  turn: "black",
  board: [...initialColumns],
  dice: [],
  hits: [],
  moves: [],
  collects: [{ color: "white" }, { color: "black" }],
  selectedItem: null,
  canCollect: false,
  hasCollectable: false,
};
const GameContext = createContext();

const gameReducer = produce((state, action) => {
  const manager = new PlayerManager(state);

  switch (action.type) {
    case ACTION_TYPES.SELECT_CHECKER: {
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
      return manager.state;
    }
    case ACTION_TYPES.COLLECT_CHECKER: {
      manager.collectChecker();
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
