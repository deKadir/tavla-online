export const ACTION_TYPES = {
  SELECT_CHECKER: "SELECT_CHECKER",
  ROLL_DICE: "ROLL_DICE",
};

export const ACTIONS = {
  selectChecker: (id) => ({ type: ACTION_TYPES.SELECT_CHECKER, id }),
  rollDice: () => ({ type: ACTION_TYPES.ROLL_DICE }),
};
