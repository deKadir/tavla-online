import Checker from "./Checker";
const Column = ({ checkers, direction, canPlay, index }) => {
  return (
    <>
      {(index === 17 || index === 6) && <div className="divider" />}
      <div
        className={`column ${direction} ${canPlay && "highlight"}`}
        col-index={index + 1}
      >
        {checkers.map((ch) => (
          <Checker {...ch} key={ch.id} />
        ))}
      </div>
    </>
  );
};

export default Column;
