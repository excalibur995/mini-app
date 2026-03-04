import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EntryPoint from '../screens/EntryPoint';

export type DashboardNavigatorParamList = {
  Home: undefined;
  Transfer: undefined;
};

const Stack = createNativeStackNavigator<DashboardNavigatorParamList>();

const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#F5F5F5',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={EntryPoint}
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
