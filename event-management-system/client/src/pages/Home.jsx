import EventCard from "../components/EventCard"

function Home() {
  return (
    <div>

      {/* Hero Section */}
      <section className="bg-pink-100 md:bg-green-500 lg:bg-blue-500 px-6 py-20 text-center">

        <h1 className="text-8xl font-bold text-slate-900 md:text-5xl lg:text-2xl">
          Discover Amazing Events
        </h1>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Find exciting events, connect with people, and register for
          experiences that interest you.
        </p>

        <button className="mt-8 rounded-lg bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700">
          Explore Events
        </button>

      </section>


      {/* Events Section */}
      <section className="bg-white px-6 py-16">

        <div className="mx-auto max-w-7xl">

          <h2 className="text-3xl font-bold text-slate-900">
            Upcoming Events
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-1 ">

            <EventCard />
            <EventCard />
            <EventCard />

          </div>

        </div>

      </section>

    </div>
  )
}

export default Home