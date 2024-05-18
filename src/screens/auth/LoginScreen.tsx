import React, { useState } from 'react';
import { Button, TextInput, View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import axios from 'axios';
import { AuthStackParamList } from '../types';
import { useAuth } from '../../contexts/AuthContext';
import { KSpacer } from '../../components/KSpacer';
import { KInputError } from '../../components/KInputError';

const styles = StyleSheet.create({
  input: {
    height: 40,
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

  const [errMessage, setErrMessage] = useState('');

  const signIn = () => {
    axios
      .post<{ jwt: string }>('/user/login', {
        username,
        password,
      })
      .then(({ data: { jwt } }) => {
        logIn(jwt);
      })
      .catch(err => {
        setErrMessage(err.response.data.message);
      });
  };

  return (
    <View style={{ padding: 18 }}>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        placeholder="Username"
        value={username}
      />
      <KSpacer />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder="Password"
        value={password}
        secureTextEntry
      />
      <KSpacer />
      <Button title="Log in" onPress={signIn} />
      <KSpacer />
      <Button title="Register" onPress={goToRegisterScreen} />
      {errMessage && <KInputError message={errMessage} />}
    </View>
  );
}
