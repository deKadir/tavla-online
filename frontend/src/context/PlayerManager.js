import { randomInteger } from "../utils/game";
import { isEmpty } from "lodash";
class Manager {
  constructor(state, checker) {
    this.state = state;
    this.checker = checker;
  }

  //rolls dice
  rollDice() {
    this.state.dice = [randomInteger(1, 6), randomInteger(1, 6)];
    this.state.isRoll = true;
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
  canMoveColumn(col) {
    if (isEmpty(col)) {
      return false;
    }
    if ([0, 1].includes(col?.checkers?.length)) {
      return true;
    }
    if (col?.checkers?.[0].color === this.state.turn) {
      return true;
    }
  }

  getTargetIndex(curr, move) {
    return this.state.turn === "white" ? curr - move : curr + move;
  }
  getCheckerById(id) {
    const colIndex = this.state.board.findIndex((col) =>
      col.checkers.some((ch) => ch.id === id)
    );
    if (colIndex !== -1) {
      return this.state.board[colIndex].checkers[0];
    }
    return this.getHits().find((ch) => ch.id === id);
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
  getHomeBoard(color = this.state.turn) {
    return color === "black"
      ? this.state.board.slice(0, 6)
      : this.state.board.slice(18, 24).reverse();
  }
  getHits() {
    return this.state.hits.filter((hit) => hit.color === this.state.turn);
  }
  calculateCheckerMove(checkerId) {
    const moves = [];
    const hits = this.getHits();
    if (!isEmpty(hits)) {
      const home = this.getHomeBoard();
      this.state.moves.forEach((mv) => {
        const targetCol = home[mv - 1];
        if (this.canMoveColumn(targetCol)) {
          moves.push(targetCol.index);
        }
      });
      return moves;
    }
    const col = this.state.board.find(
      (col) => col?.checkers?.[0]?.id === checkerId
    );
    const firstChecker = col?.checkers?.[0];
    if (firstChecker?.id) {
      this.state.moves.forEach((mv) => {
        if (firstChecker?.color === this.state.turn) {
          const targetIndex = this.getTargetIndex(col.index, mv);
          const targetCol = this.state.board.find(
            (cl) => cl.index === targetIndex
          );
          if (this.canMoveColumn(targetCol)) {
            moves.push(targetIndex);
          }
        }
      });
    }
    return moves;
  }

  canCollectChecker(checkerId) {
    if (!this.canCollectCheckers()) {
      return false;
    }
    const hasCollectable = this.state.moves.some((mv) => {
      const collectIndex = this.state.turn === "white" ? mv - 1 : 24 - mv;

      const checker = this.state.board[collectIndex]?.checkers?.[0]?.id;
      return checker === checkerId;
    });
    if (hasCollectable) {
      return true;
    }
    const board = this.state.board.filter(
      (col) => col?.checkers?.[0]?.color === this.state.turn
    );
    const lastIndex = this.state.turn === "white" ? board.length - 1 : 0;
    const collectIndex = board[lastIndex].index;
    const collectMove =
      this.state.turn === "white" ? collectIndex + 1 : 24 - collectIndex;

    const hasSmallerMove = this.state.moves.some((mv) => {
      if (mv >= collectMove) {
        return board[lastIndex]?.checkers?.[0]?.id === checkerId;
      }
    });
    return hasSmallerMove;
  }

  canCollectCheckers() {
    const hits = this.getHits();
    if (hits.length > 0) {
      return false;
    }

    let homeIndexes =
      this.state.turn === "white"
        ? [0, 1, 2, 3, 4, 5]
        : [23, 22, 21, 20, 19, 18];
    const canCollect = this.state.board
      .filter((col) => col?.checkers?.[0]?.color === this.state.turn)
      .every((col) => homeIndexes.includes(col.index));
    console.log(canCollect);
    return canCollect;
  }

  moveChecker(targetIndex) {
    this.removeAllHighlights();

    const selectedChecker = this.state.selectedChecker;
    const checker = this.getCheckerById(selectedChecker);
    const sourceIndex = this.state.board.findIndex(
      (col) => col?.checkers?.[0]?.id === selectedChecker
    );

    if (sourceIndex !== -1) {
      this.state.board[sourceIndex].checkers = this.state.board[
        sourceIndex
      ].checkers.filter((ch) => ch.id !== selectedChecker);
    } else {
      this.state.hits.pop();
    }
    const targetCol = this.state.board[targetIndex];

    //hit
    if (
      targetCol?.checkers?.length === 1 &&
      targetCol?.checkers[0].color !== this.state.turn
    ) {
      this.state.hits.push(targetCol.checkers[0]);
      this.state.board[targetIndex].checkers.pop();
    }
    this.state.board[targetIndex].checkers.push(checker);
    let playedMove = Math.abs(targetIndex - sourceIndex);
    //move from hit
    if (sourceIndex === -1) {
      if (this.state.turn === "black") {
        playedMove = targetIndex + 1;
      } else {
        playedMove = 23 - targetIndex + 1;
      }
    } else {
      playedMove = Math.abs(targetIndex - sourceIndex);
    }
    const playedMoveIndex = this.state.moves.indexOf(playedMove);
    this.state.moves.splice(playedMoveIndex, 1);
    this.calculateMoves();
  }
  selectChecker(checkerId) {
    this.state.hasCollectable = false;
    this.state.selectedChecker = checkerId;
    this.removeAllHighlights();

    const columns = this.calculateCheckerMove(checkerId);
    if (this.canCollectChecker(checkerId)) {
      this.state.hasCollectable = true;
    }
    this.highlightColumns(...columns);
  }

  calculateMoves() {
    this.state.canCollect = false;
    this.disableAllCheckers();
    const hits = this.getHits();
    if (!isEmpty(hits)) {
      const home = this.getHomeBoard();

      this.state.moves.forEach((mv) => {
        const targetCol = home[mv - 1];
        if (this.canMoveColumn(targetCol)) {
          this.enableChecker(hits[hits.length - 1].id);
        }
      });
    } else {
      this.state.board.forEach((col) => {
        const firstChecker = col?.checkers?.[0];
        if (firstChecker?.id) {
          this.state.moves.forEach((mv) => {
            if (firstChecker?.color === this.state.turn) {
              const targetIndex = this.getTargetIndex(col.index, mv);
              const targetCol = this.state.board.find(
                (cl) => cl.index === targetIndex
              );
              if (this.canMoveColumn(targetCol)) {
                this.enableChecker(firstChecker.id);
              }
            }
          });
        }
      });
    }

    if (this.canCollectCheckers() && this.state.moves.length > 0) {
      let hasCheckerForCollect = false;
      this.state.moves.forEach((mv) => {
        const collectIndex = this.state.turn === "white" ? mv - 1 : 24 - mv;
        const checkerId = this.state.board[collectIndex]?.checkers?.[0]?.id;
        if (checkerId) {
          this.enableChecker(checkerId);
        }
      });
      if (!hasCheckerForCollect) {
        const board = this.state.board.filter(
          (col) => col?.checkers?.[0]?.color === this.state.turn
        );
        const lastIndex = this.state.turn === "white" ? board.length - 1 : 0;
        const collectIndex = board[lastIndex].index;
        const collectMove =
          this.state.turn === "white" ? collectIndex + 1 : 24 - collectIndex;

        this.state.moves.forEach((mv) => {
          if (mv >= collectMove) {
            this.enableChecker(board[lastIndex]?.checkers?.[0]?.id);
          }
        });
      }
      //enable last checker if there is no matching checker
      const cols = this.state.board.filter(
        (col) => col?.checkers?.[0]?.color === this.state.turn
      );
      if (cols.length) {
        const lastColIndex = this.state.turn === "white" ? cols.length - 1 : 0;
        const checker = cols[lastColIndex].checkers[0];
        this.enableChecker(checker.id);
      }
    }
    if (!this.hasAvailableMoves()) {
      this.changeTurn();
    }
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

  collectChecker() {
    if (this.state.selectedChecker) {
      const colIndex = this.state.board.findIndex(
        (col) => col?.checkers?.[0]?.id === this.state.selectedChecker
      );
      this.state.collects.push(this.state.board[colIndex].checkers[0]);
      this.state.board[colIndex].checkers = this.state.board[
        colIndex
      ].checkers.filter((ch) => ch.id !== this.state.selectedChecker);
      this.state.canCollect = false;
      const playedMove = colIndex > 17 ? 24 - colIndex : colIndex + 1;
      this.state.moves.splice(this.state.moves.indexOf(playedMove), 1);
      this.state.selectedChecker = null;
      this.state.hasCollectable = false;
      this.calculateMoves();
    }
  }
  hasAvailableMoves() {
    const isHit = this.state.hits.some((hit) => hit?.hasMove);
    const hasMove = this.state.board.some((col) => col?.checkers?.[0]?.hasMove);
    return hasMove || isHit;
  }

  changeTurn() {
    this.state.isRoll = false;
    this.state.turn = this.state.turn === "white" ? "black" : "white";
  }
}

export default Manager;
