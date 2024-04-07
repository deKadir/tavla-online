import React from "react";

const Checker = (checker) => {
  const checkerClass =
    checker.color === "white" ? "checker-light" : "checker-dark";
  return <div className={`checker ${checkerClass} `}></div>;
};

export default Checker;
