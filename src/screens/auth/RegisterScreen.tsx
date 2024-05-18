import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext';
import { KSpacer } from '../../components/KSpacer';
import { KInputError } from '../../components/KInputError';

const EMAIL_REGEX =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/;

const CONTAINS_8_CHARACTERS = /^.{8,}$/;
const CONTAINS_DIGIT = /^(?=.*\d).+$/;
const CONTAINS_SYMBOL = /^(?=.*[!@#$%^&*. _]).+$/;
const CONTAINS_LOWERCASE = /^(?=.*[a-z]).+$/;
const CONTAINS_UPPERCASE = /^(?=.*[A-Z]).+$/;

const styles = StyleSheet.create({
  input: {
    height: 40,
    borderWidth: 1,
    padding: 10,
  },
});

function validatePassword(password: string) {
  const missing = [
    !CONTAINS_8_CHARACTERS.test(password) && 'at least 8 characters',
    !CONTAINS_DIGIT.test(password) && 'a digit',
    !CONTAINS_SYMBOL.test(password) && 'a symbol',
    !CONTAINS_LOWERCASE.test(password) && 'a lowercase letter',
    !CONTAINS_UPPERCASE.test(password) && 'an uppercase letter',
  ].filter(e => e);

  return missing.length !== 0 && `Password must contain ${missing.join(', ')}.`;
}

export function RegisterScreen() {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [errors, setErrors] = useState<Record<string, string | false>>({});

  const { logIn } = useAuth();

  const register = () => {
    const errs = {
      username: username.length < 4 && 'Username must be longer 2 characters.',
      firstName:
        firstName.length < 3 && 'First name must be longer 2 characters.',
      lastName: lastName.length < 3 && 'Last name must be longer 2 characters.',
      email: !EMAIL_REGEX.test(email) && 'Email must be valid.',
      password: validatePassword(password),
      confirmPassword: password !== confirmPassword && 'Passwords must match.',
    };

    setErrors(errs);

    if (!Object.values(errs).some(err => err)) {
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
        .catch(err => {
          setErrors({
            general: err.response.data.message,
          });
        });
    }
  };

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 18 }}>
      <TextInput
        style={styles.input}
        onChangeText={setUsername}
        placeholder="Username"
        value={username}
      />
      {errors.username && <KInputError message={errors.username} />}
      <KSpacer />
      <TextInput
        style={styles.input}
        onChangeText={setFirstName}
        placeholder="First name"
        value={firstName}
      />
      {errors.firstName && <KInputError message={errors.firstName} />}
      <KSpacer />
      <TextInput
        style={styles.input}
        onChangeText={setLastName}
        placeholder="Last name"
        value={lastName}
      />
      {errors.lastName && <KInputError message={errors.lastName} />}
      <KSpacer />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        placeholder="Email"
        value={email}
      />
      {errors.email && <KInputError message={errors.email} />}
      <KSpacer />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        placeholder="Password"
        value={password}
        secureTextEntry
      />
      {errors.password && <KInputError message={errors.password} />}
      <KSpacer />
      <TextInput
        style={styles.input}
        onChangeText={setConfirmPassword}
        placeholder="Confirm password"
        value={confirmPassword}
        secureTextEntry
      />
      {errors.confirmPassword && (
        <KInputError message={errors.confirmPassword} />
      )}
      <KSpacer />
      <Button title="Register" onPress={register} />
      {errors.general && <KInputError message={errors.general} />}
    </ScrollView>
  );
}
