import Navbar from "./components/Navbar"
import Home from "./pages/Home"

function App() {
  return (
    <div className="bg-slate-100 md:bg-green-500 lg:bg-blue-500">
      <Navbar />
      <Home />
    </div>
  )
}

export default App