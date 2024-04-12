export const ACTION_TYPES = {
  SELECT_CHECKER: "SELECT_CHECKER",
  ROLL_DICE: "ROLL_DICE",
  MOVE_CHECKER: "MOVE_CHECKER",
  COLLECT_CHECKER: "COLLECT_CHECKER",
  SET_NICKNAME: "SET_NICKNAME",
  SET_GAME: "SET_GAME",
  SET_PLAYER: "SET_PLAYER",
};

export const ACTIONS = {
  selectChecker: (checkerId) => ({
    type: ACTION_TYPES.SELECT_CHECKER,
    checkerId,
  }),
  rollDice: () => ({ type: ACTION_TYPES.ROLL_DICE }),
  moveChecker: (colIndex) => ({
    type: ACTION_TYPES.MOVE_CHECKER,
    colIndex,
  }),
  collectChecker: () => ({
    type: ACTION_TYPES.COLLECT_CHECKER,
  }),
  setNickname: (nickname) => ({
    type: ACTION_TYPES.SET_NICKNAME,
    nickname,
  }),
  setGame: (game) => ({
    type: ACTION_TYPES.SET_GAME,
    game,
  }),
  setPlayer: (player) => ({
    type: ACTION_TYPES.SET_PLAYER,
    player,
  }),
};
