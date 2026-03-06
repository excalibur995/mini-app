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

export type DynamicScreenContentProps = {
  screenData: any;
  journeyId: string;
  navigate: (action: NavigateActionPayload) => void;
  screenId: string;
};

import { useDynamicScreenState } from '../../../hooks/useDynamicScreenState';
import { NavigateActionPayload } from '../../../types/screen';
import { Stepper } from '../widgets/Display/Stepper';
import { ValidationProvider } from './ValidationContext';

function DynamicScreenContent(props: DynamicScreenContentProps) {
  const {
    screenData,
    journeyId,
    navigate,
    handleExit,
    handleNavigate,
    isFirst,
    currentIndex,
    totalSteps,
    clearSession,
    navigation,
  } = useDynamicScreenState(props);

  return (
    <Screen style={styles.container}>
      <Header
        iconColor="black"
        containerStyle={{ backgroundColor: '#F9F8F4' }}
        title={screenData.meta.title}
        rightIconName={screenData.meta.showClose && 'close'}
        onRightPress={handleExit}
        leftIconName={screenData.meta.showBack && 'back'}
        onLeftPress={() => {
          if (screenData.meta.showBack && !isFirst)
            return navigate({ direction: 'back', navigation_type: 'push' });
          clearSession(journeyId);
          return navigation.goBack();
        }}
        showBorder={false}
      />
      <View style={styles.stepper}>
        <Stepper currentStep={currentIndex + 1} totalSteps={totalSteps} />
      </View>
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
    backgroundColor: '#F9F8F4',
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
    padding: 8,
  },
  body: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  footer: {
    padding: 16,
    marginBottom: 24,
    gap: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepper: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
});
