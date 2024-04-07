export const ACTION_TYPES = {
  CLICK_CHECKER: "CLICK_CHECKER",
  ROLL_DICE: "ROLL_DICE",
};

export const ACTIONS = {
  selectChecker: (id) => ({ type: ACTION_TYPES.CLICK_CHECKER, id }),
  rollDice: () => ({ type: ACTION_TYPES.ROLL_DICE }),
};
