import React, { useMemo, useState } from 'react';
import { AuthContext } from './src/contexts/AuthContext';
import { Navigation } from './src/screens/Navigation';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const value = useMemo(
    () => ({
      isLoggedIn,
      logIn: () => setIsLoggedIn(true),
      logOut: () => setIsLoggedIn(false),
    }),
    [isLoggedIn]
  );

  return (
    <AuthContext.Provider value={value}>
      <Navigation />
    </AuthContext.Provider>
  );
}
