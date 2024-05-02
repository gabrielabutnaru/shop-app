import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

export function HomeScreen() {
  const [userName, setUsername] = useState('');
  useEffect(() => {
    axios
      .get<{ username: string }>('/user/me')
      .then(({ data: { username } }) => {
        setUsername(username);
      })
      .catch(console.log);
  }, []);
  return (
    <View>
      <Text>{userName}</Text>
    </View>
  );
}
