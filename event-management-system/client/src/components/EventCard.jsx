import { useState } from "react";

function EventCard({
  title,
  description,
  date,
  location
}) 
{
  const [registered, setRegistered] = useState(false);
  return (
    <div className="rounded-xl border bg-white p-6 shadow-lg">
      <h3 className="text-2xl font-bold text-slate-900">
        {title}
      </h3>

      <p className="mt-2 text-slate-600">
        {description}
      </p>

      {registered ? (
        <p className="mt-4 font-semibold text-green-600">
          Successfully Registered!
        </p>
      ) : (
        <button
          onClick={() => setRegistered(true)}
          className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-white"
        >
          Register
        </button>
      )}




      <p className="mt-2 text-sm text-slate-500">
        📅 {date}
      </p>

      <p className="mt-1 text-sm text-slate-500">
        📍 {location}
      </p>

    </div>
    
  );
}

export default EventCard;
