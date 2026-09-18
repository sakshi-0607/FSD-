function Home({ onExplore }) {
  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <section className="bg-slate-100 px-6 py-20 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-3xl font-bold text-slate-900">
          Discover Amazing Events
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Find exciting events, connect with people, and register for
          experiences that interest you.
        </p>

        <button 
          onClick={onExplore}
          className="mt-8 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 cursor-pointer"
        >
          Explore Events
        </button>
      </section>

      {/* Introduction Section */}
      <section className="bg-white px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-slate-900">
          Find Your Next Experience
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-slate-600">
          Explore technology workshops, conferences, festivals, and
          other exciting events happening near you.
        </p>
      </section>

    </div>
  );
}

export default Home;
