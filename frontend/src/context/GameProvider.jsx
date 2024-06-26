import { createContext, useContext, useEffect, useReducer } from "react";
import PlayerManager from "./PlayerManager";
import { ACTIONS, ACTION_TYPES } from "./actions";
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
  isRolled: false,
  board: [],
  status: "",
  winner: "",
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
      manager.collectChecker();
      socket.emit("room", { ...manager.state });
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
    case ACTION_TYPES.SET_WIN: {
      return {
        ...state,
        winner: action.winner,
        status: "FINISHED",
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

  useEffect(() => {
    const isWhiteWin =
      game.collects.filter((ch) => ch.color === "white").length === 15;
    const isBlackWin =
      game.collects.filter((ch) => ch.color === "black").length === 15;
    if (isBlackWin || isWhiteWin) {
      dispatch(ACTIONS.setWin(isWhiteWin ? "white" : "black"));
    }
  }, [game.collects]);
  useEffect(() => {
    socket.on("win", (winner) => {
      dispatch(ACTIONS.setWin(winner));
    });
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
