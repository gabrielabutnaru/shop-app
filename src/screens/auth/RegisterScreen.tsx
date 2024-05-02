import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View } from 'react-native';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
export function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { logIn } = useAuth();

  const register = () => {
    axios
      .post<{ jwt: string }>('/user/register', {
        username,
        password,
        firstName,
        lastName,
        email,
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
        onChangeText={setFirstName}
        placeholder="First name"
        value={firstName}
      />
      <TextInput
        style={styles.input}
        onChangeText={setLastName}
        placeholder="Last name"
        value={lastName}
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        placeholder="Email"
        value={email}
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder="Password"
        value={password}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        onChangeText={setConfirmPassword}
        placeholder="Confirm password"
        value={confirmPassword}
        secureTextEntry
      />
      <Button title="Register" onPress={register} />
    </View>
  );
}
