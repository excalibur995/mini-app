import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { CaNavigatorParamList } from 'src/navigation/MainNavigator';
import { useJourneyStore } from '../store/useJourneyStore';
import { useJourney } from '../utils/queries/journeyQueries';

type Props = NativeStackScreenProps<CaNavigatorParamList, 'JourneyLauncher'>;

const JourneyLauncher: React.FC<Props> = ({ route, navigation }) => {
  const { journeyId } = route.params;
  const setSession = useJourneyStore(state => state.setSession);

  console.log('Render JourneyLauncher');
  console.log('Render JourneyLauncher: journeyId ===>', journeyId);

  const {
    data: journeyData,
    isLoading,
    isError,
    refetch,
  } = useJourney(journeyId);

  console.log('Render JourneyLauncher: fetched journeyData ===>', journeyData);

  useEffect(() => {
    if (!journeyData) return;

    const firstScreen = journeyData.screens[0];
    if (!firstScreen) return;

    console.log(
      'Render JourneyLauncher: getting journey navigator route name ===>',
      journeyData.navigator,
    );

    setSession(journeyId, {
      currentScreenIndex: 0,
      journeyState: (journeyData.initialState as Record<string, unknown>) ?? {},
    });
    console.log(
      'Render JourneyLauncher: setting up journey session ===>',
      journeyId,
      {
        currentScreenIndex: 0,
        journeyState:
          (journeyData.initialState as Record<string, unknown>) ?? {},
      },
    );

    console.log(
      'Render JourneyLauncher: navigating to next screen ===>',
      journeyData.navigator,
    );

    navigation.replace(journeyData.navigator as any, { journeyId });
  }, [journeyData, journeyId, navigation, setSession]);

  if (isLoading) {
    console.log('Render JourneyLauncher: loading journey data ===>', isLoading);
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (isError) {
    console.log('Render JourneyLauncher: error loading journey ===>', isError);
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Failed to load journey.</Text>
        <Text style={styles.retry} onPress={() => refetch()}>
          Tap to retry
        </Text>
      </View>
    );
  }

  return null;
};

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  error: { fontSize: 16, color: '#333', marginBottom: 8 },
  retry: { fontSize: 14, color: '#1A56DB' },
});

export default JourneyLauncher;
