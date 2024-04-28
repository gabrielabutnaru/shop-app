/* eslint @typescript-eslint/no-unused-vars: 0 */
/* eslint no-unused-vars: 0 */
import { createContext, useContext } from 'react';

export const AuthContext = createContext({
  isLoggedIn: false,
  logIn: (_: string) => {},
  logOut: () => {},
});

export const useAuth = () => useContext(AuthContext);
