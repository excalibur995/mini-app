import React, { useMemo } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainNavigatorParamList, ScreenName } from './types';
import { getScreen } from '../core/ScreenFactory';
import { useAppContext } from '../hooks/useAppContext';

const Stack = createNativeStackNavigator<MainNavigatorParamList>();

const DEFAULT_SCREEN_OPTIONS = {
  headerShown: false,
} as const;

const MODAL_SCREEN_OPTIONS = {
  title: 'Transfer To',
  presentation: 'modal' as const,
  animation: 'slide_from_bottom' as const,
  gestureEnabled: true,
  gestureDirection: 'vertical' as const,
};

const ACCOUNT_DETAILS_OPTIONS = {
  title: 'Account Details',
} as const;

const SCREEN_NAMES = [
  'TransferListScreen',
  'BankListScreen',
  'TransferAmountScreen',
  'TransferAccountDetailScreen',
  'TransferMethodScreen',
  'TransferConfirmationScreen',
] as const;

const TransferNavigator: React.FC = () => {
  const { journey, loading } = useAppContext();

  const initialRouteName = useMemo(() => {
    if (!journey?.journey || !Array.isArray(journey.journey)) {
      return 'TransferListScreen' as keyof MainNavigatorParamList;
    }

    const firstScreen = journey.journey[0] as ScreenName;
    return firstScreen as keyof MainNavigatorParamList;
  }, [journey]);

  const screens = useMemo(
    () =>
      SCREEN_NAMES.reduce((acc, screenName) => {
        acc[screenName] = getScreen(screenName, journey);
        return acc;
      }, {} as Record<string, React.ComponentType<any>>),
    [journey],
  );

  if (loading || !journey) {
    return null;
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={DEFAULT_SCREEN_OPTIONS}
    >
      <Stack.Screen
        name="TransferListScreen"
        component={screens.TransferListScreen}
      />
      <Stack.Screen
        name="BankListScreen"
        component={screens.BankListScreen}
        options={MODAL_SCREEN_OPTIONS}
      />
      <Stack.Screen
        name="TransferAmountScreen"
        component={screens.TransferAmountScreen}
      />
      <Stack.Screen
        name="TransferAccountDetailScreen"
        component={screens.TransferAccountDetailScreen}
        options={ACCOUNT_DETAILS_OPTIONS}
      />
      <Stack.Screen
        name="TransferMethodScreen"
        component={screens.TransferMethodScreen}
      />
      <Stack.Screen
        name="TransferConfirmationScreen"
        component={screens.TransferConfirmationScreen}
      />
    </Stack.Navigator>
  );
};

export default TransferNavigator;
