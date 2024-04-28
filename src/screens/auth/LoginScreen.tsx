import React from 'react';
import { Button, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../types';
import { useAuth } from '../../contexts/AuthContext';

export function LoginScreen({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, 'LoginScreen'>) {
  const { logIn } = useAuth();

  const goToRegisterScreen = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <View>
      <Button title="Log in" onPress={logIn} />
      <Button title="Register" onPress={goToRegisterScreen} />
    </View>
  );
}
