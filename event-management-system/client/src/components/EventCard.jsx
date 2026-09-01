function EventCard() {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-md transition hover:-translate-y-1 hover:shadow-xl">

      <div className="h-40 bg-indigo-500"></div>

      <div className="p-6">

        <span className="rounded-full bg-green-100 px-3 py-1 text-sm text-green-700">
          Open
        </span>

        <h2 className="mt-4 text-xl font-bold text-slate-800">
          React Workshop
        </h2>

        <p className="mt-2 text-slate-600">
          Learn React and build modern web applications.
        </p>

        <p className="mt-4 text-sm text-slate-500">
          25 August 2026
        </p>

      </div>

    </div>
  )
}

export default EventCard