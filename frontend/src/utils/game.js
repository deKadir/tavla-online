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
    highlight: false,
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

export { initialColumns, randomInteger };
