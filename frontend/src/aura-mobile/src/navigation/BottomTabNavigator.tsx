import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FileText, Zap, PlusCircle, BarChart3, Settings } from 'lucide-react-native';
import { FristenScreen } from '../screens/main/FristenScreen';
import { AktuellesScreen } from '../screens/main/AktuellesScreen';
import { AddNewScreen } from '../screens/main/AddNewScreen';
import { StatistikScreen } from '../screens/main/StatistikScreen';
import { SettingsScreen } from '../screens/main/SettingsScreen';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#4F46E5',
        tabBarInactiveTintColor: '#9CA3AF',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#E5E7EB',
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
        headerStyle: {
          backgroundColor: '#FFFFFF',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#E5E7EB',
        },
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '700',
          color: '#1F2937',
        },
      }}
    >
      <Tab.Screen
        name="Fristen"
        component={FristenScreen}
        options={{
          tabBarIcon: ({ color, size }) => <FileText color={color} size={size} />,
          headerTitle: 'Alle Fristen',
        }}
      />
      <Tab.Screen
        name="Aktuelles"
        component={AktuellesScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Zap color={color} size={size} />,
          headerTitle: 'Wichtig & Überfällig',
        }}
      />
      <Tab.Screen
        name="Neu"
        component={AddNewScreen}
        options={{
          tabBarIcon: ({ color, size }) => <PlusCircle color={color} size={size} />,
          headerTitle: 'Neu hinzufügen',
        }}
      />
      <Tab.Screen
        name="Statistik"
        component={StatistikScreen}
        options={{
          tabBarIcon: ({ color, size }) => <BarChart3 color={color} size={size} />,
          headerTitle: 'Kostenübersicht',
        }}
      />
      <Tab.Screen
        name="Einstellungen"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Settings color={color} size={size} />,
          headerTitle: 'Einstellungen',
        }}
      />
    </Tab.Navigator>
  );
};
