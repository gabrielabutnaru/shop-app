import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { LoginScreen } from './auth/LoginScreen';
import { RegisterScreen } from './auth/RegisterScreen';
import { HomeScreen } from './app/HomeScreen';
import { CartScreen } from './app/CartScreen';
import { ProfileScreen } from './app/ProfileScreen';
import { AppTabsParamList, AuthStackParamList } from './types';
import { useAuth } from '../contexts/AuthContext';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AppTabs = createBottomTabNavigator<AppTabsParamList>();

export function Navigation() {
  const { isLoggedIn } = useAuth();

  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <AuthStack.Navigator>
          <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
          <AuthStack.Screen name="RegisterScreen" component={RegisterScreen} />
        </AuthStack.Navigator>
      ) : (
        <AppTabs.Navigator>
          <AppTabs.Screen name="HomeScreen" component={HomeScreen} />
          <AppTabs.Screen name="CartScreen" component={CartScreen} />
          <AppTabs.Screen name="ProfileScreen" component={ProfileScreen} />
        </AppTabs.Navigator>
      )}
    </NavigationContainer>
  );
}
