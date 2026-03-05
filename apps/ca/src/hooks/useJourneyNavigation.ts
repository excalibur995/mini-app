import {
  CommonActions,
  StackActions,
  useNavigation,
} from '@react-navigation/native';
import { useJourneyStore } from '../store/useJourneyStore';
import type { NavigateActionPayload } from '../types/screen';
import { useJourney } from '../utils/queries/journeyQueries';

export const useJourneyNavigation = (
  journeyId?: string,
  currentScreenId?: string,
) => {
  const navigation = useNavigation<any>();
  const updateSession = useJourneyStore(state => state.updateSession);
  const clearSession = useJourneyStore(state => state.clearSession);

  const { data: journey } = useJourney(journeyId); // cache hit

  const currentIndex =
    journey?.screens.findIndex(s => s.screenId === currentScreenId) ?? -1;

  const navigate = (action: NavigateActionPayload) => {
    console.log('navigate action:=====> ', action);
    if (!journey || !journeyId) return;
    console.log('navigate action journey:=====> ', journey);

    let nextIndex = currentIndex;

    if (action.navigation_type === 'reset' && 'target' in action) {
      clearSession(journeyId);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: action.target, params: { journeyId } }],
        }),
      );
      return;
    }

    switch (action.direction) {
      case 'next':
        nextIndex = currentIndex + 1;
        break;
      case 'back':
        nextIndex = currentIndex - 1;
        break;
      case 'jump':
        nextIndex = journey.screens.findIndex(
          s => s.screenId === action.target,
        );
        break;
    }

    if (nextIndex < 0 || nextIndex >= journey.screens.length) return;

    const nextScreen = journey.screens[nextIndex];
    updateSession(journeyId, { currentScreenIndex: nextIndex });

    // Ensure we have a default navigation_type for backwards compatibility if null
    const navType = action.navigation_type || 'push';

    if (action.direction === 'back') {
      navigation.goBack();
      return;
    }

    if (navType === 'replace') {
      navigation.dispatch(
        StackActions.replace(nextScreen.screenId, { journeyId }),
      );
    } else {
      navigation.navigate(nextScreen.screenId, { journeyId });
    }
  };

  const isFirst = currentIndex === 0;
  const isLast = journey ? currentIndex === journey.screens.length - 1 : false;
  const currentScreen = journey?.screens[currentIndex] ?? null;

  return {
    navigate,
    goNext: () => navigate({ direction: 'next', navigation_type: 'push' }),
    goBack: () => navigate({ direction: 'back', navigation_type: 'push' }),
    jumpTo: (target: string) =>
      navigate({ direction: 'jump', target, navigation_type: 'push' }),
    currentScreen,
    currentIndex,
    isFirst,
    isLast,
    journey,
  };
};
