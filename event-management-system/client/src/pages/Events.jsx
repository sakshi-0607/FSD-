import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";
import {
  getEvents,
  getMyRegistrationsApi,
  registerForEventApi,
  cancelRegistrationApi,
} from "../services/api";
import useAuth from "../hooks/useAuth";

function Events() {
  const [events, setEvents] = useState([]);
  const [registeredEventIds, setRegisteredEventIds] = useState(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionMessage, setActionMessage] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const { user } = useAuth();

  useEffect(() => {
    async function loadData() {
      try {
        const eventsData = await getEvents();
        setEvents(eventsData);

        if (user) {
          try {
            const regData = await getMyRegistrationsApi();
            const ids = new Set(
              regData.map((reg) => reg.event?._id || reg.event)
            );
            setRegisteredEventIds(ids);
          } catch {
            // Non-critical if registrations fail to load
          }
        }
      } catch (err) {
        setError(err.message || "Unable to load events");
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [user]);

  const handleRegister = async (eventId) => {
    try {
      setActionMessage("");
      await registerForEventApi(eventId);
      setRegisteredEventIds((prev) => new Set([...prev, eventId]));
      setActionMessage("Successfully registered for the event!");
      setTimeout(() => setActionMessage(""), 4000);
    } catch (err) {
      setActionMessage(err.message || "Failed to register.");
      setTimeout(() => setActionMessage(""), 4000);
    }
  };

  const handleCancelRegistration = async (eventId) => {
    try {
      setActionMessage("");
      await cancelRegistrationApi(eventId);
      setRegisteredEventIds((prev) => {
        const next = new Set(prev);
        next.delete(eventId);
        return next;
      });
      setActionMessage("Registration cancelled successfully.");
      setTimeout(() => setActionMessage(""), 4000);
    } catch (err) {
      setActionMessage(err.message || "Failed to cancel registration.");
      setTimeout(() => setActionMessage(""), 4000);
    }
  };

  const categories = [
    "All",
    ...new Set(
      events.map((e) => e.category || "General").filter(Boolean)
    ),
  ];

  const filteredEvents = events.filter((event) => {
    const search = searchText.toLowerCase();
    const matchesSearch =
      (event.title && event.title.toLowerCase().includes(search)) ||
      (event.description && event.description.toLowerCase().includes(search)) ||
      (event.location && event.location.toLowerCase().includes(search));

    const matchesCategory =
      selectedCategory === "All" ||
      (event.category || "General") === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Upcoming Events
            </h1>
            <p className="mt-2 text-slate-600">
              Explore our upcoming events and register.
            </p>
          </div>
        </div>

        {actionMessage && (
          <div className="mt-4 rounded-lg bg-indigo-50 border border-indigo-200 p-4 text-sm font-medium text-indigo-800">
            {actionMessage}
          </div>
        )}

        {!loading && !error && (
          <div className="mt-6 grid gap-4 md:grid-cols-[2fr_1fr]">
            <input
              type="search"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by event title, description, or location..."
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat === "All" ? "All Categories" : cat}
                </option>
              ))}
            </select>
          </div>
        )}

        {loading && <Loading />}

        {!loading && error && (
          <p className="mt-6 text-red-600 font-semibold">
            {error}
          </p>
        )}

        {!loading && !error && events.length === 0 && (
          <p className="mt-6 text-slate-600">
            No events are available.
          </p>
        )}

        {!loading && !error && events.length > 0 && filteredEvents.length === 0 && (
          <p className="mt-6 text-slate-600">
            No events match your search or filter.
          </p>
        )}

        {!loading && !error && filteredEvents.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard
                key={event._id}
                event={event}
                title={event.title}
                description={event.description}
                date={event.date}
                time={event.time}
                location={event.location}
                category={event.category}
                isRegistered={registeredEventIds.has(event._id)}
                onRegister={handleRegister}
                onCancel={handleCancelRegistration}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Events;
