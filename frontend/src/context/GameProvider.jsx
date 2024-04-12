import { createContext, useContext, useEffect, useReducer } from "react";
import PlayerManager from "./PlayerManager";
import { ACTION_TYPES } from "./actions";
import { produce } from "immer";
import { socket } from "../api";

const initialValues = {
  roomId: "",
  nickname: localStorage.getItem("nickname") ?? "",
  turn: "white",
  player: {
    color: "",
    id: "",
  },
  board: [],
  status: "",
  players: [],
  dice: [],
  hits: [],
  moves: [],
  collects: [],
  selectedItem: null,
  canCollect: false,
  hasCollectable: false,
};
const GameContext = createContext();

const initGameReducer = (state) => {
  return { ...state };
};
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

      socket.emit("room", { ...manager.state });
      return manager.state;
    }
    case ACTION_TYPES.MOVE_CHECKER: {
      manager.moveChecker(action.colIndex);
      socket.emit("room", { ...manager.state });
      return manager.state;
    }
    case ACTION_TYPES.COLLECT_CHECKER: {
      socket.emit("room", { ...manager.state });
      manager.collectChecker();
      return manager.state;
    }
    case ACTION_TYPES.SET_NICKNAME: {
      localStorage.setItem("nickname", action.nickname);
      return {
        ...state,
        nickname: action.nickname,
      };
    }
    case ACTION_TYPES.SET_GAME: {
      return {
        ...state,
        ...action.game,
      };
    }
    case ACTION_TYPES.SET_PLAYER: {
      return {
        ...state,
        player: { ...action.player },
      };
    }
    case ACTION_TYPES.default:
      return state;
  }
});

const GameProvider = ({ children }) => {
  const [game, dispatch] = useReducer(
    gameReducer,
    initialValues,
    initGameReducer
  );
  useEffect(() => {
    socket.on("connect", () => {
      console.log("connected");
    });
    return () => {
      socket.off("disconnect", () => {
        console.log("disconnected");
      });
    };
  }, []);

  const values = {
    game,
    dispatch,
  };

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
};

export const useGameContext = () => useContext(GameContext);

export const useIsMyTurn = () => {
  const { game } = useGameContext();
  return game.turn === player?.turn;
};

export default GameProvider;
