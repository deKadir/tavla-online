import Checker from "./Checker";
const Column = ({ checkers, direction, index }) => {
  return (
    <>
      {(index === 18 || index === 6) && <div className="divider" />}
      <div className={`column ${direction}`} col-index={index + 1}>
        {checkers.map((ch) => (
          <Checker {...ch} key={ch.id} />
        ))}
      </div>
    </>
  );
};

export default Column;
