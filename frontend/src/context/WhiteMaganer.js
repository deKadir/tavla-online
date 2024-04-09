import Manager from "./PlayerManager";
import { isEmpty } from "lodash";

class BlackManager extends Manager {
  constructor(state, checker) {
    super(state, checker);
  }

  getHomeBoard() {
    return this.state.board.slice(0, 6);
  }
  getHits() {
    return this.state.hits.filter((hit) => hit.color === "white");
  }

  canMoveColumn(col) {
    if (isEmpty(col)) {
      return false;
    }
    if ([0, 1].includes(col?.checkers?.length)) {
      return true;
    }
    if (col?.checkers?.[0].color === "white") {
      return true;
    }
  }

  isValidIndex(index) {
    return index >= 0;
  }

  selectChecker(checkerId) {
    this.state.selectedChecker = checkerId;

    this.removeAllHighlights();
    const isHit = this.getHits().some((ch) => ch.id === checkerId);
    if (!isHit) {
      const columns = this.calculateCheckerMove(checkerId);
      this.highlightColumns(...columns);
    }
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
    }

    this.state.board[targetIndex].checkers.push(checker);
    const playedMoveIndex = this.state.moves.indexOf(
      Math.abs(targetIndex - sourceIndex)
    );
    this.state.moves.splice(playedMoveIndex, 1);
    this.calculateMoves();
  }

  calculateCheckerMove(checkerId) {
    const moves = [];
    //TODO:hits
    const col = this.state.board.find(
      (col) => col?.checkers?.[0]?.id === checkerId
    );
    const firstChecker = col?.checkers?.[0];
    if (firstChecker?.id) {
      this.state.moves.forEach((mv) => {
        if (firstChecker?.color === "white") {
          const targetIndex = col.index - mv;
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

  calculateMoves() {
    this.disableAllCheckers();
    const hits = this.getHits();
    if (!isEmpty(hits)) {
      hits.forEach((hit, indx) => {
        this.state.moves.forEach((mv) => {
          const targetIndex = indx - 1 + mv;
          const targetCol = hits[targetIndex];
          if (this.canMoveColumn(targetCol)) {
            this.enableChecker(hit.id);
          }
        });
      });
    } else {
      this.state.board.forEach((col) => {
        const firstChecker = col?.checkers?.[0];
        if (firstChecker?.id) {
          this.state.moves.forEach((mv) => {
            if (firstChecker?.color === "white") {
              const targetIndex = col.index - mv;
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
    if (!this.hasAvailableMoves()) {
      this.changeTurn();
    }
  }
}

export default BlackManager;
