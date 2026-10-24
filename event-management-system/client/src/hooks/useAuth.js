import { useContext } from "react";

import { AuthContext } from "../context/AuthContextValue";

function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;