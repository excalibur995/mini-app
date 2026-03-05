import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import { useJourneyNavigation } from '../../../hooks/useJourneyNavigation';
import { CaJourneyParamList } from '../../../navigation/CurrentAccountJourneyNavigator';
import { useJourney, useScreen } from '../../../utils/queries/journeyQueries';

import { Header, Screen } from 'ui-kit';
import { DynamicZoneRenderer } from './DynamicZoneRenderer';

type Props = NativeStackScreenProps<CaJourneyParamList, any> & {
  screenId: string;
};

type DynamicScreenContentProps = {
  screenData: any;
  journeyId: string;
  navigate: (action: NavigateActionPayload) => void;
  screenId: string;
};

import { useNavigation } from '@react-navigation/native';
import { useCallback } from 'react';
import { useJourneyStore } from '../../../store/useJourneyStore';
import { NavigateActionPayload } from '../../../types/screen';
import { ValidationProvider, useValidation } from './ValidationContext';

function DynamicScreenContent(props: DynamicScreenContentProps) {
  const { screenData, journeyId, navigate, screenId } = props;
  const { validateAll } = useValidation();
  const { goBack } = useNavigation();
  const { isFirst } = useJourneyNavigation(journeyId ?? '', screenId);
  const clearSession = useJourneyStore(state => state.clearSession);

  const handleNavigate = useCallback(
    (action: NavigateActionPayload) => {
      if (action.direction !== 'back') {
        const isValid = validateAll();
        if (!isValid) {
          return;
        }
      }
      navigate(action);
    },
    [validateAll, navigate],
  );

  return (
    <Screen style={styles.container}>
      <Header
        title={screenData.meta.title}
        leftIconName={screenData.meta.showBack && 'back'}
        onLeftPress={() => {
          if (screenData.meta.showBack && !isFirst)
            return navigate({ direction: 'back', navigation_type: 'push' });
          clearSession(journeyId);
          return goBack();
        }}
        showBorder={false}
      />
      <ScrollView style={styles.body}>
        <View style={styles.header}>
          <DynamicZoneRenderer
            blocks={screenData.header ?? []}
            journeyId={journeyId}
            onNavigate={handleNavigate}
          />
        </View>

        <DynamicZoneRenderer
          blocks={screenData.body ?? []}
          journeyId={journeyId}
          onNavigate={handleNavigate}
        />
      </ScrollView>
      <View style={styles.footer}>
        <DynamicZoneRenderer
          blocks={screenData.footer ?? []}
          journeyId={journeyId}
          onNavigate={handleNavigate}
        />
      </View>
    </Screen>
  );
}

export default function DynamicScreenZone({ route, screenId }: Props) {
  const { journeyId } = route.params ?? {};
  const { navigate } = useJourneyNavigation(journeyId ?? '', screenId);

  const { data: journeyData } = useJourney(journeyId ?? '');

  const documentId =
    journeyData?.screens.find(s => s.screenId === screenId)?.documentId ?? null;

  const { data: screenData, isLoading } = useScreen(documentId);

  if (isLoading || !screenData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ValidationProvider journeyId={journeyId ?? ''}>
      <DynamicScreenContent
        screenId={screenId}
        screenData={screenData}
        journeyId={journeyId ?? ''}
        navigate={navigate}
      />
    </ValidationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'normal',
    marginBottom: 16,
    color: '#6B7280',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingTop: 16,
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  body: {
    flexGrow: 1,
    padding: 16,
  },
  footer: {
    padding: 16,
    marginBottom: 24,
    gap: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
