import Game from "./Game";
import Start from "./Start";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const pages = createBrowserRouter([
  {
    path: "/",
    element: <Start />,
  },
  {
    path: "/game/:roomId",
    element: <Game />,
  },
]);

const Pages = () => {
  return <RouterProvider router={pages} />;
};

export default Pages;
