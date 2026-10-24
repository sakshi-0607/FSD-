import EventCard from "../components/EventCard";
import useAuth from "../hooks/useAuth";

function MyRegistrations() {
  const { user, registrations } = useAuth();

  return (
    <div className="min-h-screen bg-slate-100 px-6 py-16">

      <div className="mx-auto max-w-7xl">

        <h1 className="text-4xl font-bold text-slate-900">
          My Registrations
        </h1>

        {!user && (
          <p className="mt-2 text-red-600">
            Please login to view your registrations.
          </p>
        )}

        {user && registrations.length === 0 && (
          <p className="mt-2 text-slate-600">
            You have not registered for any events yet.
          </p>
        )}

        {user && registrations.length > 0 && (
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {registrations.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}

      </div>

    </div>
  );
}

export default MyRegistrations;
