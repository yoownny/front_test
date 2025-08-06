import { Routes, Route } from "react-router-dom";
import "./styles/App.css";
import IndexPage from "./pages";
import RoomPage from "./pages/room";
import LobbyPage from "./pages/lobby";
import LoginPage from "./pages/login";
import LogoHeader from "./components/layout/LogoHeader";
// import NicknameSetupPage from "./pages/nicknameSetup";

function App() {
  return (
    <>
      <LogoHeader />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/lobby" element={<LobbyPage />} />
        <Route path="/room/:id" element={<RoomPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/signup" element={<NicknameSetupPage />} /> */}
      </Routes>
    </>
  );
}

export default App;
