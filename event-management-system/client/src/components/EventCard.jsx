import useAuth from "../hooks/useAuth";

function EventCard({ event }) {
  const { registrations, registerForEvent, unregisterFromEvent } = useAuth();
  const registered = registrations.some(
    (registeredEvent) => registeredEvent.id === event.id
  );

  return (
    <div className="rounded-xl border bg-white p-6 shadow-md">

      <h2 className="text-xl font-bold text-slate-900">
        {event.title}
      </h2>

      <p className="mt-2 text-slate-600">
        {event.description}
      </p>

      <p className="mt-3 text-slate-600">
        Date: {event.date}
      </p>

      <p className="text-slate-600">
        Time: {event.time}
      </p>

      <p className="text-slate-600">
        Location: {event.location}
      </p>

      <p className="text-slate-600">
        Category: {event.category || "Other"}
      </p>

      {registered ? (

        <div className="mt-4">
          <p className="font-semibold text-green-600">
            Successfully Registered!
          </p>
          <button
            onClick={() => unregisterFromEvent(event.id)}
            className="mt-2 rounded-lg border border-red-600 px-4 py-2
                       text-red-600 transition hover:bg-red-50"
          >
            Cancel Registration
          </button>
        </div>

      ) : (

        <button
          onClick={() => registerForEvent(event)}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2
                     text-white transition
                     hover:bg-indigo-700"
        >
          Register
        </button>

      )}

    </div>
  );
}

export default EventCard;
