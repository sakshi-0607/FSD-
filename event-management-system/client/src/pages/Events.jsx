import { useEffect, useState } from "react";

import EventCard from "../components/EventCard";
import Loading from "../components/Loading";
import { getEvents } from "../services/api";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    async function loadEvents() {
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (err) {
        setError(err.message || "Unable to load events");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  const categories = [
    "All",
    ...new Set(events.map((event) => event.category || "Other")),
  ];

  const filteredEvents = events.filter((event) => {
    const searchValue = searchText.toLowerCase();
    const matchesSearch =
      event.title.toLowerCase().includes(searchValue) ||
      event.description.toLowerCase().includes(searchValue) ||
      event.location.toLowerCase().includes(searchValue);
    const matchesCategory =
      selectedCategory === "All" ||
      (event.category || "Other") === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-16">

      <div className="mx-auto max-w-7xl">

        <h1 className="text-4xl font-bold text-slate-900">
          Upcoming Events
        </h1>

        <p className="mt-2 text-slate-600">
          Explore our upcoming events and register.
        </p>

        {!loading && !error && (
          <div className="mt-8 grid gap-4 md:grid-cols-[2fr_1fr]">
            <input
              type="search"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search by event, description, or location"
              className="rounded-lg border bg-white px-4 py-3 outline-none
                         focus:ring-2 focus:ring-indigo-500"
            />

            <select
              value={selectedCategory}
              onChange={(event) => setSelectedCategory(event.target.value)}
              className="rounded-lg border bg-white px-4 py-3 outline-none
                         focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        )}

        {loading && <Loading />}

        {!loading && error && (
          <p className="mt-6 text-red-600">
            {error}
          </p>
        )}

        {!loading && !error && events.length === 0 && (
          <p className="mt-6 text-slate-600">
            No events are available.
          </p>
        )}

        {!loading && !error && filteredEvents.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            ))}
          </div>
        )}

        {!loading && !error && events.length > 0 && filteredEvents.length === 0 && (
          <p className="mt-6 text-slate-600">
            No events match your search or selected category.
          </p>
        )}

      </div>

    </div>
  );
}

export default Events;
