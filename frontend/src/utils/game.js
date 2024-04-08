let id = 1;
let colIndex = 0;
const checker = (color) => {
  return {
    id: id++,
    color,
    hasMove: false,
    isSelected: false,
  };
};
const generateCheckers = (color, length = 0) => {
  const checkers = Array.from({ length }).map(() => checker(color));
  const index = colIndex++;
  const direction = index < 12 ? "up" : "down";

  return {
    index,
    direction,
    canPlay: false,
    checkers,
  };
};

const initialColumns = [
  { ...generateCheckers("black", 2) },
  { ...generateCheckers() },
  { ...generateCheckers() },
  { ...generateCheckers() },
  { ...generateCheckers() },
  { ...generateCheckers("white", 5) },
  { ...generateCheckers() },
  { ...generateCheckers("white", 3) },
  { ...generateCheckers() },
  { ...generateCheckers() },
  { ...generateCheckers() },
  { ...generateCheckers("black", 5) },
  { ...generateCheckers("white", 5) },
  { ...generateCheckers() },
  { ...generateCheckers() },
  { ...generateCheckers() },
  { ...generateCheckers("black", 3) },
  { ...generateCheckers() },
  { ...generateCheckers("black", 5) },
  { ...generateCheckers() },
  { ...generateCheckers() },
  { ...generateCheckers() },
  { ...generateCheckers() },
  { ...generateCheckers("white", 2) },
];

const randomInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkerCanMove = (state, col, mv) => {
  const nextIndex = mv + col.index;
  if (
    nextIndex < 23 &&
    ([0, 1].includes(state.board[nextIndex]?.checkers?.length) ||
      state.board[nextIndex]?.checkers[0]?.color === state.turn)
  ) {
    return true;
  } else {
    return false;
  }
};
const checkerPossibleMoves = (state, col) => {
  const possibleMoves = state.dice.filter((mv) =>
    checkerCanMove(state, col, mv)
  );
  return possibleMoves;
};
const resetBoardStates = (board) => {
  return board.map((col) => ({
    ...col,
    canPlay: false,
    checkers: col.checkers.map((ch) => {
      return { ...ch, hasMove: false, isSelected: false };
    }),
  }));
};

const highlightColumns = (state, checkerId) => {
  const { dice } = state;
  const colIndex = state.board.findIndex(
    (col) => col?.checkers[0]?.id === checkerId
  );
  const nextIndex = colIndex + dice[0];

  return state.board;
};
const calculatePossibleMoves = (state) => {};
const calculateAvailableCheckers = (state) => {
  const board = state.board.map((col) => {
    if (col.checkers?.[0]?.color !== state.turn) {
      return col;
    }
    const moves = checkerPossibleMoves(state, col);

    if (moves.length) {
      col.checkers[0].hasMove = true;
    }
    return col;
  });
  return board;
};

export {
  initialColumns,
  randomInteger,
  checkerPossibleMoves,
  calculatePossibleMoves,
  calculateAvailableCheckers,
  resetBoardStates,
  highlightColumns,
};
