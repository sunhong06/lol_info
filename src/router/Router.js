import { createBrowserRouter } from "react-router-dom";
import Login from "../page/Login/Login";
import SignUp from "../page/SignUp/SignUp";
import Champion from "../page/Champion/Champion";
import BoardSeeMore from "../page/Community/BoardMore/BoardSeeMore";
import Community from "../page/Community/Community";
import Writing from "../page/Community/Writing/Writing";
import Home from "../page/Home/Home";
import App from "../App";
import SummonerInfo from "../page/Home/SummonerInfo";
import Ranking from "../page/Ranking/Ranking";
import "../scss/common.scss";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        path: "/lol_info",
        element: <Home />,
      },
      {
        path: "/SummonerInfo/:summonerName",
        element: <SummonerInfo />,
      },
      {
        path: "/Ranking",
        element: <Ranking />,
      },
      {
        path: "/Community",
        element: <Community />,
      },
      {
        path: "/Champion",
        element: <Champion />,
      },
      { path: "/Writing", element: <Writing /> },
      {
        path: "/Community/:boardId",
        element: <BoardSeeMore />,
      },
      {
        path: "/SignUp",
        element: <SignUp />,
      },
      {
        path: "/Login",
        element: <Login />,
      },
      {
        basename: process.env.PUBLIC_URL,
      },
    ],
  },
]);
