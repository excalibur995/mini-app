import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useJourney } from '../utils/queries/journeyQueries';

import AcctCaAccountPurposeScreen from '../screens/base/AcctCaAccountPurposeScreen';
import AcctCaNpwpCapturePrologueScreen from '../screens/base/AcctCaNpwpCapturePrologueScreen';
import AcctCaNpwpCaptureScreen from '../screens/base/AcctCaNpwpCaptureScreen';
import AcctCaNpwpReviewScreen from '../screens/base/AcctCaNpwpReviewScreen';
import { FALLBACK_JOURNEYS } from '../utils/config/fallbackJourney';

export type CaJourneyParamList = {
  ACCT_CA_ACCOUNT_PURPOSE: { journeyId?: string };
  ACCT_CA_NPWP_CAPTURE: { journeyId?: string };
  ACCT_CA_NPWP_REVIEW: { journeyId?: string };
  ACCT_CA_NPWP_CAPTURE_PROLOGUE: { journeyId?: string };
};

const Stack = createNativeStackNavigator<CaJourneyParamList>();

export const CurrentAccountJourneyNavigator = ({ route }: any) => {
  const { journeyId } = route.params ?? {};

  const { data: journey, isLoading } = useJourney(journeyId);
  // const setSession = useJourneyStore(state => state.setSession);
  // const getSession = useJourneyStore(state => state.getSession);

  // useEffect(() => {
  //   if (journeyId && journey && !getSession(journeyId)) {
  //     setSession(journeyId, {
  //       currentScreenIndex: 0,
  //       journeyState: (journey.initialState as Record<string, unknown>) ?? {},
  //     });
  //   }
  // }, [journey, journeyId, setSession, getSession]);

  const { initialRouteName, presentation } = useMemo(() => {
    if (!journey || journey.screens.length === 0) {
      return {
        initialRouteName: FALLBACK_JOURNEYS.ACCT_CA_APPLY.initialScreenId,
        presentation: FALLBACK_JOURNEYS.ACCT_CA_APPLY.initialPresentation,
      };
    }

    return {
      initialRouteName: journey.screens[0].screenId as keyof CaJourneyParamList,
      presentation:
        (journey.presentation as any) ??
        FALLBACK_JOURNEYS.ACCT_CA_APPLY.initialPresentation,
    };
  }, [journey]);

  if (journeyId && isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
        contentStyle: {
          backgroundColor: '#F9F8F4',
        },
        presentation,
      }}
    >
      <Stack.Screen
        name="ACCT_CA_ACCOUNT_PURPOSE"
        component={AcctCaAccountPurposeScreen}
        initialParams={{ journeyId }}
      />
      <Stack.Screen
        name="ACCT_CA_NPWP_CAPTURE"
        component={AcctCaNpwpCaptureScreen}
        initialParams={{ journeyId }}
      />
      <Stack.Screen
        name="ACCT_CA_NPWP_REVIEW"
        component={AcctCaNpwpReviewScreen}
        initialParams={{ journeyId }}
      />
      <Stack.Screen
        name="ACCT_CA_NPWP_CAPTURE_PROLOGUE"
        component={AcctCaNpwpCapturePrologueScreen}
        initialParams={{ journeyId }}
      />
    </Stack.Navigator>
  );
};
