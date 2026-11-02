import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function EventCard(props) {
  const item = props.event || props;
  const {
    _id,
    id,
    title,
    description,
    date,
    time,
    location,
    category,
  } = item;

  const eventId = _id || id;
  const { user } = useAuth();
  const [internalRegistered, setInternalRegistered] = useState(false);

  const isRegistered = props.isRegistered !== undefined
    ? props.isRegistered
    : internalRegistered;

  const formatDate = (rawDate) => {
    if (!rawDate) return "";
    try {
      const parsed = new Date(rawDate);
      if (isNaN(parsed.getTime())) return rawDate;
      return parsed.toLocaleDateString("en-IN", {
        timeZone: "UTC",
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    } catch {
      return rawDate;
    }
  };

  const handleRegister = async () => {
    if (props.onRegister) {
      await props.onRegister(eventId);
    } else {
      setInternalRegistered(true);
    }
  };

  const handleCancel = async () => {
    if (props.onCancel) {
      await props.onCancel(eventId);
    } else {
      setInternalRegistered(false);
    }
  };

  return (
    <div className="flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-md transition hover:-translate-y-1 hover:shadow-xl">
      <div>
        <div className="flex items-start justify-between gap-2">
          <h2 className="text-xl font-bold text-slate-900">
            {title}
          </h2>
          {category && (
            <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
              {category}
            </span>
          )}
        </div>

        <p className="mt-2 text-slate-600">
          {description}
        </p>

        <div className="mt-4 space-y-1 text-sm text-slate-600">
          <p>
            <span className="font-medium text-slate-700">Date:</span> {formatDate(date)}
          </p>
          {time && (
            <p>
              <span className="font-medium text-slate-700">Time:</span> {time}
            </p>
          )}
          {location && (
            <p>
              <span className="font-medium text-slate-700">Location:</span> {location}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 border-t border-slate-100 pt-4">
        {isRegistered ? (
          <div className="flex items-center justify-between gap-2">
            <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              ✓ Registered
            </span>
            <button
              type="button"
              onClick={handleCancel}
              className="text-xs font-semibold text-red-600 transition hover:text-red-800"
            >
              Cancel Registration
            </button>
          </div>
        ) : user ? (
          <button
            type="button"
            onClick={handleRegister}
            disabled={props.registering}
            className="w-full rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50"
          >
            {props.registering ? "Registering..." : "Register Now"}
          </button>
        ) : (
          <Link
            to="/login"
            className="block w-full rounded-lg bg-indigo-600 px-4 py-2 text-center font-semibold text-white transition hover:bg-indigo-700"
          >
            Login to Register
          </Link>
        )}
      </div>
    </div>
  );
}

export default EventCard;
