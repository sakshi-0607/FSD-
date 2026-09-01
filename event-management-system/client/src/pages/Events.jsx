import { useState } from "react"
import EventCard from "../components/EventCard"

function Events() {

  const [search, setSearch] = useState("")

  const events = [
    {
      id: 1,
      name: "Tech Conference 2026",
      description:
        "A conference focused on modern technology, innovation and the future of the digital world.",
      date: "15 September 2026",
      time: "10:00 AM",
      location: "Mumbai",
    },

    {
      id: 2,
      name: "AI & Machine Learning Workshop",
      description:
        "Learn the fundamentals of Artificial Intelligence and Machine Learning through practical sessions.",
      date: "20 September 2026",
      time: "11:00 AM",
      location: "Pune",
    },

    {
      id: 3,
      name: "Web Development Bootcamp",
      description:
        "A hands-on workshop covering modern web development technologies and development practices.",
      date: "25 September 2026",
      time: "9:30 AM",
      location: "Mumbai",
    },

    {
      id: 4,
      name: "Startup & Entrepreneurship Meet",
      description:
        "Connect with entrepreneurs, startup founders and students interested in building new businesses.",
      date: "30 September 2026",
      time: "2:00 PM",
      location: "Bangalore",
    },

    {
      id: 5,
      name: "Cyber Security Seminar",
      description:
        "Explore modern cyber security threats, protection techniques and security best practices.",
      date: "5 October 2026",
      time: "10:30 AM",
      location: "Delhi",
    },

    {
      id: 6,
      name: "Data Science Workshop",
      description:
        "Learn about data analysis, visualization and machine learning techniques used in data science.",
      date: "10 October 2026",
      time: "11:00 AM",
      location: "Hyderabad",
    },
  ]

  // Search events
  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(search.toLowerCase())
  )

  // Register button
  const handleRegister = (event) => {
    alert(`You selected: ${event.name}`)
  }

  return (
    <div className="min-h-screen bg-gray-100">

      {/* ================= NAVBAR ================= */}
      <nav className="bg-white shadow-sm">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          {/* Logo */}
          <div className="text-2xl font-bold text-blue-600">
            EventHub
          </div>

          {/* Navigation */}
          <div className="flex items-center gap-6">

            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </a>

            <a
              href="#"
              className="text-blue-600 font-semibold"
            >
              Events
            </a>

            <a
              href="#"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              My Registrations
            </a>

            <button className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
              Login
            </button>

          </div>

        </div>

      </nav>


      {/* ================= HEADER ================= */}
      <section className="bg-blue-600 text-white">

        <div className="max-w-7xl mx-auto px-6 py-14">

          <h1 className="text-4xl md:text-5xl font-bold">
            Upcoming Events
          </h1>

          <p className="mt-3 text-blue-100 text-lg">
            Discover events, connect with people and register for
            your favourite events.
          </p>

        </div>

      </section>


      {/* ================= MAIN CONTENT ================= */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Heading + Search */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">

          <div>
            <h2 className="text-3xl font-bold text-gray-800">
              Explore Events
            </h2>

            <p className="text-gray-500 mt-1">
              Find the perfect event for you.
            </p>
          </div>


          {/* Search */}
          <div>
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full md:w-80 px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>


        {/* ================= EVENT CARDS ================= */}

        {filteredEvents.length > 0 ? (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredEvents.map((event) => (

              <EventCard
                key={event.id}
                event={event}
                onRegister={handleRegister}
              />

            ))}

          </div>

        ) : (

          <div className="bg-white rounded-xl p-10 text-center shadow">

            <h3 className="text-xl font-semibold text-gray-700">
              No events found
            </h3>

            <p className="text-gray-500 mt-2">
              Try searching for another event.
            </p>

          </div>

        )}

      </main>

    </div>
  )
}

export default Events