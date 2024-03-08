import React, { Suspense, useEffect, useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  createBrowserRouter,
} from "react-router-dom";

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
import RankSearch from "../components/rank/RankSearch";
import "../scss/common.scss";

import RankingPage from "../components/rank/RankingPage";
// import App from "../App";
import Loading from "../components/loading/Loading";
// const App = React.lazy(() => import("../App"));
// const Home = React.lazy(() => import("../page/Home/Home"));
// const SummonerInfo = React.lazy(() => import("../page/Home/SummonerInfo"));
// const Login = React.lazy(() => import("../page/Login/Login"));
// const SignUp = React.lazy(() => import("../page/SignUp/SignUp"));
// const Champion = React.lazy(() => import("../page/Champion/Champion"));
// const BoardSeeMore = React.lazy(() =>
//   import("../page/Community/BoardMore/BoardSeeMore")
// );

// const RankingPage = React.lazy(() => import("../components/rank/RankingPage"));
// const Ranking = React.lazy(() => import("../page/Ranking/Ranking"));
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: 404,
    children: [
      {
        index: true,
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
      // {
      //   path: "/Ranking",
      //   element: <RankingPage />,
      // },
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

// function Router({ userObj, setIsLogin, isLogin }) {
//   return (
//     <>
//       <BrowserRouter basename={process.env.PUBLIC_URL}>
//         <Header />
//         <Routes>
//           <Route path="/" element={<Home />}></Route>
//           <Route
//             path="/SummonerInfo/:summonerName"
//             element={<SummonerInfo />}
//           ></Route>
//           <Route path="/Ranking" element={<Ranking />}></Route>
//           <Route path="/Ranking/:page" element={<RankingPage />}></Route>
//           {/* <Route path="/Ranking/?search=/:search" element={<Ranking />}></Route> */}
//           <Route path="/Community" element={<Community />}></Route>
//           <Route path="/Champion" element={<Champion />}></Route>
//           <Route
//             path="/Writing"
//             element={<Writing userObj={userObj} />}
//           ></Route>
//           <Route path="/Community/:boardId" element={<BoardSeeMore />}></Route>
//           <Route path="/SignUp" element={<SignUp />}></Route>
//           <Route path="/Login" element={<Login />}></Route>
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// }
