function Navbar({ currentPage, setCurrentPage }) {
  return (
    <nav className="bg-slate-900 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        <h1 
          className="text-2xl font-bold cursor-pointer"
          onClick={() => setCurrentPage && setCurrentPage("home")}
        >
          EventHub
        </h1>

        <div className="flex gap-6 items-center">
          <button 
            onClick={() => setCurrentPage && setCurrentPage("home")}
            className={`hover:text-indigo-400 cursor-pointer ${currentPage === "home" ? "text-indigo-400 font-semibold" : ""}`}
          >
            Home
          </button>

          <button 
            onClick={() => setCurrentPage && setCurrentPage("events")}
            className={`hover:text-indigo-400 cursor-pointer ${currentPage === "events" ? "text-indigo-400 font-semibold" : ""}`}
          >
            Events
          </button>

          <a href="#" className="hover:text-indigo-400">
            Login
          </a>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;
