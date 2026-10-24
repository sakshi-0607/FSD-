import { useEffect, useState } from "react";

import { AuthContext } from "./AuthContextValue";

function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("eventHubUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [registrations, setRegistrations] = useState(() => {
    const savedRegistrations = localStorage.getItem("eventHubRegistrations");
    return savedRegistrations ? JSON.parse(savedRegistrations) : [];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("eventHubUser", JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem(
      "eventHubRegistrations",
      JSON.stringify(registrations)
    );
  }, [registrations]);

  function login(email) {
    const loggedInUser = {
      name: email.split("@")[0],
      email: email,
    };

    setUser(loggedInUser);

    localStorage.setItem(
      "eventHubUser",
      JSON.stringify(loggedInUser)
    );
  }

  function logout() {
    setUser(null);

    localStorage.removeItem("eventHubUser");
  }

  function registerForEvent(event) {
    setRegistrations((currentRegistrations) => {
      const alreadyRegistered = currentRegistrations.some(
        (registeredEvent) => registeredEvent.id === event.id
      );

      if (alreadyRegistered) {
        return currentRegistrations;
      }

      return [...currentRegistrations, event];
    });
  }

  function unregisterFromEvent(eventId) {
    setRegistrations((currentRegistrations) =>
      currentRegistrations.filter((event) => event.id !== eventId)
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        registrations,
        registerForEvent,
        unregisterFromEvent,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
