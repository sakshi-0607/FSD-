async function apiRequest(path, options = {}) {
  const token = localStorage.getItem("eventHubToken");
  const headers = {
    ...(options.body ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`/api${path}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

// Existing event API
export function getEvents() {
  return apiRequest("/events");
}

export function getEventById(id) {
  return apiRequest(`/events/${id}`);
}

export function createEvent(eventData) {
  return apiRequest("/events", {
    method: "POST",
    body: JSON.stringify(eventData),
  });
}

export function updateEvent(id, eventData) {
  return apiRequest(`/events/${id}`, {
    method: "PUT",
    body: JSON.stringify(eventData),
  });
}

export function deleteEvent(id) {
  return apiRequest(`/events/${id}`, {
    method: "DELETE",
  });
}

// Register an account
export function registerUser(userData) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

// Login
export function loginUser(credentials) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

// Load the current authenticated user
export function getCurrentUser() {
  return apiRequest("/auth/me");
}

// Registration API
export function registerForEventApi(eventId) {
  return apiRequest("/registrations", {
    method: "POST",
    body: JSON.stringify({ eventId }),
  });
}

export function getMyRegistrationsApi() {
  return apiRequest("/registrations/my");
}

export function cancelRegistrationApi(eventId) {
  return apiRequest(`/registrations/${eventId}`, {
    method: "DELETE",
  });
}

export function getAllRegistrationsApi() {
  return apiRequest("/registrations");
}
