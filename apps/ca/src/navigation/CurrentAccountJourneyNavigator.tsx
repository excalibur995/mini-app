import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useJourney } from '../utils/queries/journeyQueries';

// Import CA legacy/fallback screens
import AcctCaAccountPurposeScreen from '../screens/base/AcctCaAccountPurposeScreen';
import AcctCaNpwpCaptureScreen from '../screens/base/AcctCaNpwpCaptureScreen';
import AcctCaNpwpReviewScreen from '../screens/base/AcctCaNpwpReviewScreen';

export type CaJourneyParamList = {
  ACCT_CA_ACCOUNT_PURPOSE: { journeyId?: string };
  ACCT_CA_NPWP_CAPTURE: { journeyId?: string };
  ACCT_CA_NPWP_REVIEW: { journeyId?: string };
};

const Stack = createNativeStackNavigator<CaJourneyParamList>();

const FALLBACK_INITIAL_ROUTE = 'ACCT_CA_ACCOUNT_PURPOSE';
const FALLBACK_PRESENTATION = 'card';

export const CurrentAccountJourneyNavigator = ({ route }: any) => {
  const { journeyId } = route.params ?? {};

  const { data: journey, isLoading } = useJourney(journeyId);

  const { initialRouteName, presentation } = useMemo(() => {
    if (!journey || journey.screens.length === 0) {
      return {
        initialRouteName: FALLBACK_INITIAL_ROUTE as keyof CaJourneyParamList,
        presentation: FALLBACK_PRESENTATION as any,
      };
    }

    return {
      initialRouteName: journey.screens[0].screenId as keyof CaJourneyParamList,
      presentation: (journey.presentation as any) ?? FALLBACK_PRESENTATION,
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
    </Stack.Navigator>
  );
};
