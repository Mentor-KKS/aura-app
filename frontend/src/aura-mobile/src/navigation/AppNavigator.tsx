import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { RegisterScreen } from '../screens/auth/RegisterScreen';
import { BottomTabNavigator } from './BottomTabNavigator';
import { EditContractScreen } from '../screens/app/EditContractScreen';
import { useAuthStore } from '../state/authStore';
import { ActivityIndicator, View } from 'react-native';

const Stack = createNativeStackNavigator();

export const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading, loadStoredAuth } = useAuthStore();

  useEffect(() => {
    loadStoredAuth();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4F46E5" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#F9FAFB' },
          }}
        >
          <Stack.Screen name="Main" component={BottomTabNavigator} />
          <Stack.Screen
            name="CreateContract"
            component={EditContractScreen}
            options={{
              headerShown: true,
              title: 'Neuer Vertrag',
              headerStyle: { backgroundColor: '#FFFFFF' },
            }}
          />
          <Stack.Screen
            name="EditContract"
            component={EditContractScreen}
            options={{
              headerShown: true,
              title: 'Vertrag bearbeiten',
              headerStyle: { backgroundColor: '#FFFFFF' },
            }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: '#F9FAFB' },
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
