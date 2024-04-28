import React from 'react';
import { Button, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

export function RegisterScreen() {
  const { logIn } = useAuth();
  return (
    <View>
      <Button title="Register" onPress={logIn} />
    </View>
  );
}
