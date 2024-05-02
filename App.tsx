import React, { useMemo, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { AuthContext } from './src/contexts/AuthContext';
import { Navigation } from './src/screens/Navigation';

axios.defaults.baseURL = 'http://10.0.2.2:3000';
axios.defaults.headers.common.Accept = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!SecureStore.getItem('jwt'));

  const value = useMemo(
    () => ({
      isLoggedIn,
      logIn: (jwt: string) => {
        setIsLoggedIn(true);
        SecureStore.setItem('jwt', jwt);
        axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
      },
      logOut: () => {
        setIsLoggedIn(false);
        SecureStore.deleteItemAsync('jwt');
        axios.defaults.headers.common.Authorization = '';
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
