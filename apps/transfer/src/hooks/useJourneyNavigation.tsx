import { useCallback, useMemo } from 'react';
import { useNavigation as useRNNavigation } from '@react-navigation/native';
import { NavigationFactory } from '../core/NavigationFactory';
import { MainNavigatorParamList, ScreenName } from '../navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useAppContext } from './useAppContext';

type NavigationProp = NativeStackNavigationProp<MainNavigatorParamList>;

type NavigationMethod = 'navigate' | 'push' | 'replace';

export const useJourneyNavigation = (currentScreen: ScreenName) => {
  const navigation = useRNNavigation<NavigationProp>();
  const { journey } = useAppContext();

  const NavigationFactoryInstance = useMemo(
    () => new NavigationFactory(journey),
    [journey],
  );

  const navigate = useCallback(
    (params?: any, method: NavigationMethod = 'navigate') => {
      const nextScreen = NavigationFactoryInstance.getNextScreen(currentScreen);

      if (!nextScreen) {
        console.warn('Already at the last screen of the journey');
        return;
      }

      // Use the specified navigation method
      // @ts-ignore - Dynamic Navigation
      navigation[method](nextScreen, params);
    },
    [navigation, currentScreen, NavigationFactoryInstance],
  );

  return {
    navigate,
  };
};
