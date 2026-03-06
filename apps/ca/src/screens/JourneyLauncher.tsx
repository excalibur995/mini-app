import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { CaNavigatorParamList } from 'src/navigation/MainNavigator';

import { useJourneyStore } from '../store/useJourneyStore';
import { FALLBACK_JOURNEYS } from '../utils/config/fallbackJourney';
import { useJourney } from '../utils/queries/journeyQueries';

type Props = NativeStackScreenProps<CaNavigatorParamList, 'JourneyLauncher'>;

const JourneyLauncher: React.FC<Props> = ({ route, navigation }) => {
  const { journeyId } = route.params;
  const setSession = useJourneyStore(state => state.setSession);

  const {
    data: journeyData,
    isLoading,
    isError,
    isPaused, // React Query sets this when offline
    refetch,
  } = useJourney(journeyId);

  // Resolve: live data → persisted cache (automatic) → bundled fallback
  const resolvedJourney = journeyData ?? FALLBACK_JOURNEYS[journeyId];

  useEffect(() => {
    if (!resolvedJourney) return;

    if (resolvedJourney.isFallback) {
      console.warn(`[JourneyLauncher] Using bundled fallback for ${journeyId}`);
    }

    const firstScreen = resolvedJourney.screens[0];
    if (!firstScreen) return;

    setSession(journeyId, {
      currentScreenIndex: 0,
      journeyState:
        (resolvedJourney.initialState as Record<string, unknown>) ?? {},
    });

    navigation.replace(resolvedJourney.navigator as any, { journeyId });
  }, [resolvedJourney, journeyId, navigation, setSession]);

  // We have a fallback — skip the loader entirely
  if (resolvedJourney) return null;

  if (isLoading || isPaused) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        {isPaused && (
          <Text style={styles.offlineHint}>Waiting for connection…</Text>
        )}
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Unable to load journey.</Text>
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
  offlineHint: { fontSize: 12, color: '#666' },
});

export default JourneyLauncher;
