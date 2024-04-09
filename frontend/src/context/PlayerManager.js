import { randomInteger } from "../utils/game";

class Manager {
  constructor(state, checker) {
    this.state = state;
    this.checker = checker;
  }

  //rolls dice
  rollDice() {
    this.state.dice = [randomInteger(1, 6), randomInteger(1, 6)];
    return this.state;
  }
  //set available moves
  setMoves() {
    const { dice } = this.state;
    if (dice[0] === dice[1]) {
      this.state.moves = Array.from({ length: 4 }).map(() => dice[0]);
    } else {
      this.state.moves = [...dice];
    }
  }
  highlightColumns(...column) {
    this.state.board = this.state.board.map((col) => {
      if (column.includes(col.index)) {
        col.highlight = true;
      }
      return col;
    });
    return this.state;
  }
  getCheckerById(id) {
    const colIndex = this.state.board.findIndex((col) => {
      const hasId = col.checkers.some((ch) => {
        console.log(ch.id);
        return ch.id === id;
      });
      return hasId;
    });

    return this.state.board[colIndex].checkers[0];
  }
  enableChecker(checkerId) {
    const chIndex = this.state.hits.findIndex((ch) => ch.id === checkerId);
    if (chIndex !== -1) {
      this.state.hits[chIndex].hasMove = true;
      return this.state;
    }

    const colIndex = this.state.board.findIndex(
      (col) => col?.checkers?.[0]?.id === checkerId
    );
    this.state.board[colIndex].checkers[0].hasMove = true;
    return this.state;
  }
  removeAllHighlights() {
    this.state.board = this.state.board.map((col) => ({
      ...col,
      highlight: false,
    }));
  }
  disableAllCheckers() {
    this.state.hits = this.state.hits.map((h) => ({ ...h, hasMove: false }));
    this.state.board = this.state.board.map((col) => ({
      ...col,
      checkers: !col?.checkers?.length
        ? []
        : col?.checkers.map((ch) => ({ ...ch, hasMove: false })),
    }));
    return this.state;
  }
  hasAvailableMoves() {
    const isHit = this.state.hits.some((hit) => hit?.hasMove);
    const hasMove = this.state.board.some((col) => col?.checkers?.[0]?.hasMove);
    return hasMove || isHit;
  }

  changeTurn() {
    this.state.turn = this.state.turn === "white" ? "black" : "white";
  }
}

export default Manager;
