import Game from "./Game";
import Start from "./Start";

const pages = [
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "/game",
    element: <Game />,
  },
];
//Small project no need for react router dom
const Pages = () => {
  const path = window.location.pathname;

  const Page = pages.find((page) => path.slice(1) === page.path.split("/")[1])
    ?.element ?? <h1>Opps! aradığın sayfa bulunamadı.</h1>;
  return Page;
};

export default Pages;
