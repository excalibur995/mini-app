import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import CasaEntryPoint from '../screens/CasaEntryPoint';
import EntryPoint from '../screens/EntryPoint';
import JourneyLauncher from '../screens/JourneyLauncher';
import { queryClient } from '../utils/queryClient';
import { CurrentAccountJourneyNavigator } from './CurrentAccountJourneyNavigator';

export type CaNavigatorParamList = {
  Home: undefined;
  CasaEntryPoint: undefined;
  JourneyLauncher: { journeyId: string };
  CurrentAccountJourneyNavigator: { journeyId: string };
};

const Stack = createNativeStackNavigator<CaNavigatorParamList>();

const MainNavigator = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          contentStyle: {
            backgroundColor: '#F9F8F4',
          },
        }}
      >
        <Stack.Screen name="Home" component={EntryPoint} />
        <Stack.Screen
          name="CasaEntryPoint"
          options={{ headerShown: false }}
          component={CasaEntryPoint}
        />
        <Stack.Screen
          name="JourneyLauncher"
          options={{ headerShown: false }}
          component={JourneyLauncher}
        />
        <Stack.Screen
          name="CurrentAccountJourneyNavigator"
          options={{ headerShown: false, gestureEnabled: false }}
          component={CurrentAccountJourneyNavigator}
        />
      </Stack.Navigator>
    </QueryClientProvider>
  );
};

export default MainNavigator;
