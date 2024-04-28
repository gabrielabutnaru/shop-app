import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types';
import { useAuth } from '../../contexts/AuthContext';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export function LoginScreen({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, 'LoginScreen'>) {
  const { logIn } = useAuth();

  const goToRegisterScreen = () => {
    navigation.navigate('RegisterScreen');
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        placeholder="Name"
        value={username}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder="Password"
        value={password}
        secureTextEntry
      />
      <Button
        title="Log in"
        onPress={() => {
          logIn('jwt');
        }}
      />
      <Button title="Register" onPress={goToRegisterScreen} />
    </View>
  );
}
