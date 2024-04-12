import React, { useEffect, useMemo, useState } from "react";
import Column from "../components/Game/Column";
import { useGameContext } from "../context/GameProvider";
import { ACTIONS } from "../context/actions";
import Checker from "../components/Game/Checker";
import { useParams } from "react-router-dom";
import { api, socket } from "../api";
import WinModal from "../components/Game/WinnerModal";
const Game = () => {
  const { game, dispatch } = useGameContext();
  const [error, setError] = useState("");
  const player = game?.player;
  const params = useParams();
  const board = useMemo(() => {
    if (player?.color === "white") {
      return [...game.board]
        ?.map((col) => ({
          ...col,
          direction: col.direction === "up" ? "down" : "up",
        }))
        .reverse();
    } else {
      return game?.board;
    }
  }, [player?.color, game?.board]);
  useEffect(() => {
    (async () => {
      setError("");
      const roomId = params.roomId;
      if (!roomId) {
        return setError("Böyle bir oyun bulunamadı!");
      }
      try {
        const { data: roomData } = await api.getRoom(roomId);
        const { id, hits, board, status, collect, players } = roomData;
        socket.emit("join room", roomId, (player) => {
          console.log(player);
          dispatch(ACTIONS.setPlayer(player));
        });
        dispatch(
          ACTIONS.setGame({ hits, board, status, collect, roomId: id, players })
        );
      } catch (err) {
        setError("Böyle bir oyun bulunamadı!");
      }
    })();
  }, [params.roomId]);

  useEffect(() => {
    socket.on(game.roomId, (room) => {
      dispatch(ACTIONS.setGame({ ...room }));
    });
  }, [socket, game.roomId]);

  console.log(board);
  if (error) {
    return (
      <main>
        <h1>{error}</h1>
      </main>
    );
  }

  return (
    <main className="wrapper">
      <WinModal />
      <div className={`board`}>
        <div className="collect">
          <div
            className={`collect-white ${
              game.hasCollectable && game.turn === "white"
                ? "highlight-collect"
                : ""
            }`}
            onClick={() => dispatch(ACTIONS.collectChecker())}
          >
            {game.collects
              .filter((clt) => clt.color === "white")
              .map(() => (
                <div className="collect-item white" />
              ))}
          </div>
          <div
            className={`collect-black ${
              game.hasCollectable && game.turn === "black"
                ? "highlight-collect"
                : ""
            }`}
            onClick={() => dispatch(ACTIONS.collectChecker())}
          >
            {game.collects
              .filter((clt) => clt.color === "black")
              .map(() => (
                <div className="collect-item black" />
              ))}
          </div>
        </div>
        <div
          className={`dice-wrapper ${game.turn === "black" ? "left" : "right"}`}
        >
          <div>{JSON.stringify(game.dice)}</div>

          <button
            disabled={game.turn !== player.color || game.isRolled}
            onClick={() => dispatch(ACTIONS.rollDice())}
          >
            Roll dice
          </button>
        </div>
        <div className="hits-wrapper">
          {game.hits.map((hit) => (
            <Checker {...hit} key={hit.id} />
          ))}
        </div>
        {/* Top */}
        {board
          .slice(0, 12)
          .map(({ index, checkers, canPlay, direction, highlight }) => (
            <Column
              key={index}
              turn={game.turn}
              dice={game.dice}
              checkers={checkers}
              canPlay={canPlay}
              index={index}
              direction={direction}
              highlight={highlight}
            />
          ))}
        {/* bottom */}
        {board
          .slice(12, 24)
          .reverse()
          .map(({ index, checkers, canPlay, direction, highlight }) => (
            <Column
              key={index}
              turn={game.turn}
              dice={game.dice}
              checkers={checkers}
              canPlay={canPlay}
              index={index}
              highlight={highlight}
              direction={direction}
            />
          ))}
      </div>
      {/* <div>users</div> */}
    </main>
  );
};

export default Game;
