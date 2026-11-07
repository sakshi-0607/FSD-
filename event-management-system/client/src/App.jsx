import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";


function App() {
  const [currentPage, setCurrentPage] = useState("home");

  return (
    <div>
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
