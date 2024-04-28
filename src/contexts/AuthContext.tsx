import { createContext, useContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  logIn: () => {},
  logOut: () => {},
});

export const useAuth = () => useContext(AuthContext);
