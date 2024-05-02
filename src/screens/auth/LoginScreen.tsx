import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';
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

  const signIn = () => {
    axios
      .post<{ jwt: string }>('/user/login', {
        username,
        password,
      })
      .then(({ data: { jwt } }) => {
        logIn(jwt);
      })
      .catch(console.log);
  };

  return (
    <View>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        placeholder="Username"
        value={username}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder="Password"
        value={password}
        secureTextEntry
      />
      <Button title="Log in" onPress={signIn} />
      <Button title="Register" onPress={goToRegisterScreen} />
    </View>
  );
}
