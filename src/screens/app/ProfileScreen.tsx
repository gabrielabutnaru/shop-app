import React from 'react';
import { Button, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

export function ProfileScreen() {
  const { logOut } = useAuth();

  return (
    <View>
      <Button title="Log Out" onPress={logOut} />
    </View>
  );
}
