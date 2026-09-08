function Navbar() {
  return (
    <nav className="bg-slate-900 text-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        
        <h1 className="text-2xl font-bold">
          EventHub
        </h1>

        <div className="flex gap-6">
          <a href="#" className="hover:text-indigo-400">
            Home
          </a>

          <a href="#" className="hover:text-indigo-400">
            Events
          </a>

          <a href="#" className="hover:text-indigo-400">
            Login
          </a>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;

