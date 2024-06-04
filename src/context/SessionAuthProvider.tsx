"use client";

import { createContext, useContext, ReactNode, useReducer, useEffect } from "react";
import { SessionProvider, useSession } from "next-auth/react";

// Define the state interface
interface AuthState {
  token: string | null;
  role: string | null;
  email: string | null;
}

// Initial state for the authentication context
const initialState: AuthState = {
  token: null,
  role: null,
  email: null,
};

// Define the actions that can be dispatched to the reducer
type Action = 
  | { type: "SET_TOKEN"; payload: string }
  | { type: "SET_ROLE"; payload: string }
  | { type: "SET_EMAIL"; payload: string }
  | { type: "LOGOUT" };

// Define the reducer function
const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "SET_TOKEN":
      return { ...state, token: action.payload };
    case "SET_ROLE":
      return { ...state, role: action.payload };
    case "SET_EMAIL":
      return { ...state, email: action.payload };
    case "LOGOUT":
      return { ...state, token: null, role: null, email: null };
    default:
      return state;
  }
};

// Create the authentication context
const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

// Custom hook to use the AuthContext
export const useAuth = () => useContext(AuthContext);

// AuthProvider component
const AuthProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (session) {
      dispatch({ type: "SET_TOKEN", payload: session.user.token });
      dispatch({ type: "SET_ROLE", payload: session.user.role });
      dispatch({ type: "SET_EMAIL", payload: session.user.email });
    }
  }, [session]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// SessionAuthProvider component that includes the AuthProvider
const SessionAuthProvider = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <AuthProvider>{children}</AuthProvider>
    </SessionProvider>
  );
};

export default SessionAuthProvider;
