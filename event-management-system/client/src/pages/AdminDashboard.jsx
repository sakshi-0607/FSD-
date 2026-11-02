import { useEffect, useState } from "react";
import Loading from "../components/Loading";
import {
  getEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  getAllRegistrationsApi,
} from "../services/api";

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("events"); // 'events' or 'registrations'
  const [events, setEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  // Form state
  const [isEditing, setIsEditing] = useState(false);
  const [currentEventId, setCurrentEventId] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const loadData = async () => {
    try {
      const [eventsData, regsData] = await Promise.all([
        getEvents(),
        getAllRegistrationsApi().catch(() => []),
      ]);
      setEvents(eventsData);
      setRegistrations(regsData);
    } catch (err) {
      setError(err.message || "Failed to load admin data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let active = true;
    async function init() {
      try {
        const [eventsData, regsData] = await Promise.all([
          getEvents(),
          getAllRegistrationsApi().catch(() => []),
        ]);
        if (active) {
          setEvents(eventsData);
          setRegistrations(regsData);
        }
      } catch (err) {
        if (active) setError(err.message || "Failed to load admin data");
      } finally {
        if (active) setLoading(false);
      }
    }

    init();
    return () => {
      active = false;
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentEventId(null);
    setFormData({
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      category: "",
    });
  };

  const handleEditClick = (event) => {
    setIsEditing(true);
    setCurrentEventId(event._id);
    const formattedDate = event.date
      ? new Date(event.date).toISOString().split("T")[0]
      : "";
    setFormData({
      title: event.title || "",
      description: event.description || "",
      date: formattedDate,
      time: event.time || "",
      location: event.location || "",
      category: event.category || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (
      !formData.title.trim() ||
      !formData.description.trim() ||
      !formData.date ||
      !formData.time.trim() ||
      !formData.location.trim()
    ) {
      setMessage("Please fill in all required fields.");
      return;
    }

    try {
      setSubmitting(true);
      if (isEditing) {
        await updateEvent(currentEventId, formData);
        setMessage("Event updated successfully!");
      } else {
        await createEvent(formData);
        setMessage("Event created successfully!");
      }
      resetForm();
      await loadData();
      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      setMessage(err.message || "Failed to save event");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title}"?`)) {
      return;
    }

    try {
      setMessage("");
      await deleteEvent(id);
      setMessage(`Event "${title}" deleted successfully!`);
      await loadData();
      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      setMessage(err.message || "Failed to delete event");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-slate-900">
          Admin Dashboard
        </h1>
        <p className="mt-2 text-slate-600">
          Manage events and view user registrations.
        </p>

        {/* Navigation Tabs */}
        <div className="mt-6 flex border-b border-slate-200">
          <button
            type="button"
            onClick={() => setActiveTab("events")}
            className={`border-b-2 px-6 py-3 font-semibold transition ${
              activeTab === "events"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            Manage Events ({events.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("registrations")}
            className={`border-b-2 px-6 py-3 font-semibold transition ${
              activeTab === "registrations"
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-700"
            }`}
          >
            View Registrations ({registrations.length})
          </button>
        </div>

        {message && (
          <div className="mt-4 rounded-lg bg-indigo-50 border border-indigo-200 p-4 text-sm font-medium text-indigo-800">
            {message}
          </div>
        )}

        {loading && <Loading />}

        {!loading && error && (
          <p className="mt-6 text-red-600 font-semibold">{error}</p>
        )}

        {!loading && activeTab === "events" && (
          <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1.5fr]">
            {/* Create / Edit Event Form */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-md h-fit">
              <h2 className="text-2xl font-bold text-slate-900">
                {isEditing ? "Edit Event" : "Create New Event"}
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {isEditing ? "Update existing event details." : "Fill in the details to publish a new event."}
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Title *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="e.g. AI Conference 2026"
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe what the event is about..."
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    required
                  ></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Date *
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleInputChange}
                      className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Time *
                    </label>
                    <input
                      type="text"
                      name="time"
                      value={formData.time}
                      onChange={handleInputChange}
                      placeholder="e.g. 10:00 AM"
                      className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Location *
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      placeholder="e.g. Mumbai"
                      className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-medium text-slate-700">
                      Category
                    </label>
                    <input
                      type="text"
                      name="category"
                      value={formData.category}
                      onChange={handleInputChange}
                      placeholder="e.g. Workshop"
                      className="w-full rounded-lg border border-slate-300 px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 rounded-lg bg-indigo-600 px-4 py-2.5 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
                  >
                    {submitting ? "Saving..." : isEditing ? "Save Changes" : "Create Event"}
                  </button>

                  {isEditing && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="rounded-lg border border-slate-300 px-4 py-2.5 font-semibold text-slate-700 transition hover:bg-slate-50"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Existing Events List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-900">
                All Events ({events.length})
              </h2>

              {events.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-slate-500">
                  No events added yet. Use the form to create your first event!
                </div>
              ) : (
                events.map((event) => (
                  <div
                    key={event._id}
                    className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
                  >
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-lg font-bold text-slate-900">
                            {event.title}
                          </h3>
                          {event.category && (
                            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                              {event.category}
                            </span>
                          )}
                        </div>
                        <p className="mt-1 text-sm text-slate-600">
                          {event.description}
                        </p>
                        <div className="mt-2 flex flex-wrap gap-4 text-xs text-slate-500">
                          <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                          <span>⏰ {event.time}</span>
                          <span>📍 {event.location}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 sm:pt-0">
                        <button
                          type="button"
                          onClick={() => handleEditClick(event)}
                          className="rounded-lg border border-indigo-600 px-3 py-1.5 text-xs font-semibold text-indigo-600 transition hover:bg-indigo-50"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(event._id, event.title)}
                          className="rounded-lg border border-red-600 px-3 py-1.5 text-xs font-semibold text-red-600 transition hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {!loading && activeTab === "registrations" && (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white shadow-md overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">
                User Registrations
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Review all users registered for events.
              </p>
            </div>

            {registrations.length === 0 ? (
              <p className="p-8 text-center text-slate-500">
                No user registrations found.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-xs font-semibold uppercase text-slate-700">
                    <tr>
                      <th className="px-6 py-4">User</th>
                      <th className="px-6 py-4">Email</th>
                      <th className="px-6 py-4">Event</th>
                      <th className="px-6 py-4">Event Date</th>
                      <th className="px-6 py-4">Registered On</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {registrations.map((reg) => (
                      <tr key={reg._id} className="hover:bg-slate-50 transition">
                        <td className="px-6 py-4 font-medium text-slate-900">
                          {reg.user?.name || "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          {reg.user?.email || "N/A"}
                        </td>
                        <td className="px-6 py-4 font-medium text-indigo-600">
                          {reg.event?.title || "Deleted Event"}
                        </td>
                        <td className="px-6 py-4">
                          {reg.event?.date
                            ? new Date(reg.event.date).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td className="px-6 py-4 text-xs text-slate-500">
                          {new Date(reg.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
