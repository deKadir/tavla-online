class GameManager {
  constructor(state) {
    this.state = state;
  }

  resetBoardStates() {
    this.state.board = this.state.board.map((col) => ({
      ...col,
      highlight: false,
      checkers: col.checkers.map((ch) => {
        return { ...ch, hasMove: false, isSelected: false };
      }),
    }));
    return this.state;
  }
  calculatePossibleMoves() {
    const { dice } = this.state;
    if (dice[0] === dice[1]) {
      this.state.possibleMoves = Array.from({ length: 4 }).map(() => dice[0]);
    } else {
      this.state.possibleMoves = [...dice];
    }
  }

  findColumnByChecker(checker) {
    return this.state.board.find((col) =>
      col.checkers.some((ch) => ch?.id === checker?.id)
    );
  }
  findColumnByCheckerId(checkerId) {
    return this.state.board.find((col) =>
      col.checkers.some((ch) => ch?.id === checkerId)
    );
  }

  calculateMoves(checker) {
    const col = this.findColumnByChecker(checker);
    const colIndex = col.index;
    const moves = [];

    this.state.possibleMoves.forEach((move) => {
      const targetIndex =
        this.state.turn === "black" ? colIndex + move : colIndex - move;

      if (targetIndex > 23 && this.state.turn === "black") {
        return;
      }
      if (targetIndex < 0 && this.state.turn === "white") {
        return;
      }

      const targetCol = this.state.board[targetIndex];
      const targetCheckers = targetCol.checkers;

      if (
        targetCheckers?.[0]?.color === this.state.turn ||
        targetCheckers.length === 1 ||
        targetCheckers.length === 0
      ) {
        moves.push(move);
      } else {
        return;
      }
    });

    return moves;
  }

  highlightCheckers() {
    this.removeCheckerHighligts();
    const hits = this.state.hits.filter((hit) => hit.color === this.state.turn);
    if (hits.length > 0) {
      const home = this.getHomeBoard();
      home.forEach((col, index) => {
        this.state.possibleMoves.forEach((dice) => {
          const targetIndex = index - 1 + dice;
          if (
            [0, 1].includes(home[targetIndex]?.checkers?.length) ===
              this.state.turn ||
            home[targetIndex]?.checkers?.[0]?.color === this.state.turn
          ) {
            const lastHitIndex = this.state.hits.findLastIndex(
              (hit) => hit.color === this.state.turn
            );
            this.state.hits[lastHitIndex].hasMove = true;
          } else {
            this.changeTurn();
          }
        });
      });
      return;
    }
    this.state.board = this.state.board.map((col) => {
      if (!col.checkers.length) {
        return col;
      }
      if (col.checkers[0].color !== this.state.turn) {
        return col;
      }
      if (this.calculateMoves(col.checkers[0]).length) {
        col.checkers[0].hasMove = true;
      }
      return col;
    });
  }

  highlightColumns(checkerId) {
    this.state.board = this.state.board.map((col) => ({
      ...col,
      highlight: false,
    }));
    const col = this.state.board.find(
      (col) => col.checkers?.[0]?.id === checkerId
    );

    const isHit = this.state.hits.some((ch) => ch.id === checkerId);
    if (isHit) {
      const board = this.getHomeBoard();
      board.forEach((col, index) => {
        this.state.possibleMoves.forEach((move) => {
          const target = index - 1 + move;
          const targetCol = board[target];
          console.log(targetCol);
          if (
            [0, 1].includes(targetCol?.checkers?.length) ||
            board[target.checkers?.[0]?.color === this.state.turn]
          ) {
            const targetIndex = this.state.board.find(
              (col) => col.index === targetCol.index
            );
            console.log(targetIndex);
            // this.state.board[targetIndex].highlight = true;
          }
        });
      });
      return;
    }

    const moves = this.calculateMoves(col.checkers[0]);
    moves.forEach((mv) => {
      const targetIndex =
        this.state.turn === "black" ? col.index + mv : col.index - mv;
      this.state.board[targetIndex].highlight = true;
    });
    return this.state;
  }
  removeColumnHighligts() {
    this.state.board = this.state.board.map((col) => ({
      ...col,
      highlight: false,
    }));
    return this.state;
  }
  removeCheckerHighligts() {
    this.state.board = this.state.board.map((col) => ({
      ...col,
      checkers: col.checkers.map((ch) => ({ ...ch, hasMove: false })),
    }));
  }

  moveChecker(targetColIndex) {
    const checkerId = this.state.selectedItem;
    const checkerCol = this.findColumnByCheckerId(checkerId);
    if (!this.state.board[targetColIndex].highlight) {
      return this.state;
    }
    //set move
    const checker = checkerCol.checkers[0];
    const targetCol = this.state.board[targetColIndex];
    if (
      targetCol?.checkers?.length > 0 &&
      targetCol.checkers?.[0].color !== this.state.turn
    ) {
      this.state.hits.push(targetCol.checkers[0]);
      this.state.board[targetColIndex].checkers.splice(0, 1);
    }
    this.state.board[targetColIndex].checkers.push(checker);
    this.state.board[checkerCol.index].checkers.splice(0, 1);
    //handle possible moves
    const playedMove = targetColIndex - checkerCol.index;
    const moveIndex = this.state.possibleMoves.indexOf(playedMove);
    //reset selected item
    this.state.selectedItem = null;
    //set turn
    this.state.possibleMoves.splice(moveIndex, 1);
    if (this.state.possibleMoves.length === 0) {
      this.changeTurn();
    }
    return this.state;
  }
  changeTurn() {
    this.state.turn = this.state.turn === "black" ? "white" : "black";
    return this.state;
  }
  getHomeBoard() {
    return this.state.turn === "black" ? black : white;
  }
}

export default GameManager;
