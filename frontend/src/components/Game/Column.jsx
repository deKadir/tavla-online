import Checker from "./Checker";
const Column = ({ checkers, index }) => {
  const direction = index > 12 ? "down" : "up";
  return (
    <>
      {(index === 19 || index === 7) && <div className="divider" />}
      <div className={`column ${direction}`} col-index={index}>
        {checkers.map((ch) => (
          <Checker {...ch} />
        ))}
      </div>
    </>
  );
};

export default Column;
