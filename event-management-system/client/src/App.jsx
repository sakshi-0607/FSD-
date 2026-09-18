import { useState } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";

function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === "home" ? (
        <Home onExplore={() => setCurrentPage("events")} />
      ) : (
        <Events />
      )}
    </div>
  );
}

export default App;
