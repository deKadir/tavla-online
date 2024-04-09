import Manager from "./PlayerManager";
import { isEmpty } from "lodash";

class BlackManager extends Manager {
  constructor(state, checker) {
    super(state, checker);
  }

  getHomeBoard() {
    return this.state.board.slice(18, 24).reverse();
  }
  getHits() {
    return this.state.hits.filter((hit) => hit.color === "black");
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
  canMoveColumn(col) {
    if (isEmpty(col)) {
      return false;
    }
    if ([0, 1].includes(col?.checkers?.length)) {
      return true;
    }
    if (col?.checkers?.[0].color === "black") {
      return true;
    }
  }

  isValidIndex(index) {
    return index <= 23;
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
        if (firstChecker?.color === "black") {
          const targetIndex = col.index + mv;
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
    //calculate hit moves
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
            if (firstChecker?.color === "black") {
              const targetIndex = col.index + mv;
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
