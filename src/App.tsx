import { Outlet } from "react-router-dom";
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
