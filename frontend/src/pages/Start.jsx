import { useNavigate } from "react-router-dom";
import { socket } from "../api";

const Start = () => {
  const navigate = useNavigate();
  const onPlay = (e) => {
    e.preventDefault();
    socket.emit("create room", (room) => {
      navigate(`/game/${room.id}`);
    });
  };
  return (
    <main className="start-wrapper">
      <section>
        <h1>Tavla Online</h1>
      </section>
      <form>
        <button type="submit" onClick={onPlay}>
          Oyna
        </button>
      </form>
    </main>
  );
};

export default Start;
