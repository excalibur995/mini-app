import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CaScreen from '../screens/CaScreen';
import DashboardScreen from '../screens/DashboardScreen';
import TransferScreen from '../screens/TransferScreen';

export type MainNavigatorParamList = {
  Dashboard: undefined;
  ScanPay: undefined;
  Transfer: undefined;
  IconTest: undefined;
  CA: undefined;
};

const Stack = createNativeStackNavigator<MainNavigatorParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#282828',
        },
      }}
    >
      <Stack.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="Transfer"
        component={TransferScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
      <Stack.Screen
        name="CA"
        component={CaScreen}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
