import React, { useMemo, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { AuthContext } from './src/contexts/AuthContext';
import { Navigation } from './src/screens/Navigation';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!SecureStore.getItem('jwt'));

  const value = useMemo(
    () => ({
      isLoggedIn,
      logIn: (jwt: string) => {
        setIsLoggedIn(true);
        SecureStore.setItem('jwt', jwt);
      },
      logOut: () => {
        setIsLoggedIn(false);
        SecureStore.deleteItemAsync('jwt');
      },
    }),
    [isLoggedIn]
  );

  return (
    <AuthContext.Provider value={value}>
      <Navigation />
    </AuthContext.Provider>
  );
}
