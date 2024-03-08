import React, { useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";
import { AuthService } from "./fbase/fbase";
import Loading from "./components/loading/Loading";
import { Outlet, RouterProvider } from "react-router-dom";
import { router } from "./router/Router";
import Header from "./components/header/Header";

function App() {
  return (
    <div style={{ height: "100vh" }}>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;
