import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import Loading from "../components/Loading";
import useAuth from "../hooks/useAuth";
import { getMyRegistrationsApi, cancelRegistrationApi } from "../services/api";

function MyRegistrations() {
  const { user } = useAuth();
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    let active = true;

    if (!user) {
      return;
    }

    async function fetchRegs() {
      try {
        const data = await getMyRegistrationsApi();
        if (active) setRegistrations(data);
      } catch (err) {
        if (active) setError(err.message || "Failed to load registrations");
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchRegs();

    return () => {
      active = false;
    };
  }, [user]);

  const handleCancelRegistration = async (eventId) => {
    try {
      setMessage("");
      await cancelRegistrationApi(eventId);
      setRegistrations((prev) =>
        prev.filter((r) => (r.event?._id || r.event) !== eventId)
      );
      setMessage("Registration cancelled successfully.");
      setTimeout(() => setMessage(""), 4000);
    } catch (err) {
      setMessage(err.message || "Failed to cancel registration.");
      setTimeout(() => setMessage(""), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-4xl font-bold text-slate-900">
          My Registrations
        </h1>

        {user ? (
          <p className="mt-2 text-slate-600">
            Welcome, <span className="font-semibold">{user.name}</span>. Here are the events you are registered for.
          </p>
        ) : (
          <p className="mt-2 text-red-600 font-medium">
            Please log in to view your registrations.
          </p>
        )}

        {message && (
          <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-4 text-sm font-medium text-green-800">
            {message}
          </div>
        )}

        {user && loading && <Loading />}

        {!loading && error && (
          <p className="mt-6 text-red-600 font-semibold">{error}</p>
        )}

        {(!loading || !user) && !error && user && registrations.length === 0 && (
          <div className="mt-8 rounded-xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="text-slate-600">
              You haven't registered for any events yet.
            </p>
            <Link
              to="/events"
              className="mt-4 inline-block rounded-lg bg-indigo-600 px-5 py-2 font-semibold text-white transition hover:bg-indigo-700"
            >
              Browse Events
            </Link>
          </div>
        )}

        {user && registrations.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {registrations
              .filter((reg) => reg.event)
              .map((reg) => (
                <EventCard
                  key={reg._id}
                  event={reg.event}
                  isRegistered={true}
                  onCancel={() => handleCancelRegistration(reg.event._id)}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyRegistrations;
