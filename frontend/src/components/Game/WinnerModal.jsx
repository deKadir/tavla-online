import React from "react";
import { useGameContext } from "../../context/GameProvider";

const WinnerModal = () => {
  const { game } = useGameContext();
  const winner = game.players.find((player) => player.color === game.winner);
  return (
    <dialog open={game.winner}>
      <article>
        <center>
          <h2>Tebrikler 🎉🥳</h2>
          <p>
            oyunun kazananı &nbsp;
            <b>{winner?.nickname}</b>
            &nbsp; oldu
          </p>
          <a href="/">
            <button>Tamam</button>
          </a>
        </center>
      </article>
    </dialog>
  );
};

export default WinnerModal;
