export const ACTION_TYPES = {
  SELECT_CHECKER: "SELECT_CHECKER",
  ROLL_DICE: "ROLL_DICE",
  MOVE_CHECKER: "MOVE_CHECKER",
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
};
