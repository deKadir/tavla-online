import { useGameContext } from "../../context/GameProvider";
import { ACTIONS } from "../../context/actions";
import Checker from "./Checker";
const Column = ({ checkers, direction, highlight, index }) => {
  const { dispatch } = useGameContext();

  const handleClick = () => {
    if (highlight) {
      dispatch(ACTIONS.moveChecker(index));
    }
  };
  return (
    <>
      {(index === 17 || index === 6) && <div className="divider" />}
      <div
        className={`column ${direction} ${highlight ? "highlight" : ""} ${
          checkers?.length > 5 ? "shrink" : ""
        }`}
        col-index={index + 1}
        onClick={handleClick}
      >
        {checkers.map((ch) => (
          <Checker {...ch} key={ch.id} />
        ))}
      </div>
    </>
  );
};

export default Column;
