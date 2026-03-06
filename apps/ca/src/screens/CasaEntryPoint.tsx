import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { CaNavigatorParamList } from 'src/navigation/MainNavigator';
import { preloadJourney } from '../utils/queries/journeyQueries';

import { Chip, Header, InteractiveCard, Screen, theme } from 'ui-kit';

type Props = NativeStackScreenProps<CaNavigatorParamList, 'CasaEntryPoint'>;

const tabs = ['Deposits', 'Cards', 'Time Deposits', 'Invest'];

const newApplications = [
  {
    id: 'savings',
    title: 'Savings Account',
    details: 'A starter-friendly option for everyday use and long-term goals.',
    journeyId: 'ACCT_CA_SAVINGS',
  },
  {
    id: 'term',
    title: 'Term Savings',
    details:
      'A fixed-term option to help you plan and grow your finances for the future.',
    journeyId: 'ACCT_CA_TERM',
  },
  {
    id: 'gift',
    title: 'Maybank Gift',
    details: 'Redeem an instant reward for your regular monthly savings.',
    journeyId: 'ACCT_CA_GIFT',
  },
  {
    id: 'current',
    title: 'Current Account',
    details:
      'A convenient checking facility account for your personal and business needs.',
    journeyId: 'ACCT_CA_APPLY',
  },
] as const;

export const journeyMap: Record<
  (typeof newApplications)[number]['journeyId'],
  keyof CaNavigatorParamList | ''
> = {
  ACCT_CA_APPLY: 'CurrentAccountJourneyNavigator',
  ACCT_CA_SAVINGS: '' as any,
  ACCT_CA_TERM: '',
  ACCT_CA_GIFT: '',
};

const CasaEntryPoint: React.FC<Props> = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('Deposits');

  return (
    <Screen style={styles.container}>
      <Header
        title="Apply"
        leftIconName="back"
        containerStyle={{
          backgroundColor: '#F9F8F4',
        }}
        onLeftPress={() => {
          if (navigation.canGoBack()) navigation.goBack();
        }}
        showBorder={false}
      />

      <View style={styles.tabsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabsScroll}
        >
          {tabs.map(tab => (
            <Chip
              key={tab}
              title={tab}
              isSelected={selectedTab === tab}
              onPress={() => setSelectedTab(tab)}
              style={styles.chip}
            />
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* <Label size="large" weight="bold" style={styles.sectionTitle}>
          Application status
        </Label>

        <InteractiveCard
          title="Continue your last application"
          subtitle="Application on 11 Feb 2026"
          actionButton={
            <Icon
              icon="chevron-right"
              size={24}
              color={theme.colors?.gray?.dark || '#666'}
            />
          }
          style={styles.card}
          onCardPress={() => {}}
        />

        <Label size="large" weight="bold" style={styles.sectionTitleMt24}>
          New application
        </Label> */}

        {newApplications.map(app => (
          <InteractiveCard
            key={app.id}
            title={app.title}
            details={app.details}
            style={styles.card}
            onPressIn={() => {
              const routeName = journeyMap[app.journeyId];
              if (routeName) {
                preloadJourney(app.journeyId);
                navigation.preload(routeName as any, {
                  journeyId: app.journeyId,
                });
              }
            }}
            onCardPress={() => {
              const routeName = journeyMap[app.journeyId];
              if (routeName) {
                navigation.navigate(routeName as any, {
                  journeyId: app.journeyId,
                });
              }
            }}
          />
        ))}
      </ScrollView>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F9F8F4', // Match design background
  },
  tabsContainer: {
    paddingVertical: theme.spacing?.md || 16,
  },
  tabsScroll: {
    paddingHorizontal: theme.spacing?.md || 16,
  },
  chip: {
    marginRight: theme.spacing?.sm || 8,
  },
  scrollContent: {
    padding: theme.spacing?.md || 16,
    paddingBottom: theme.spacing?.xl || 32,
  },
  sectionTitle: {
    marginBottom: theme.spacing?.md || 16,
  },
  sectionTitleMt24: {
    marginBottom: theme.spacing?.md || 16,
    marginTop: 24,
  },
  card: {
    marginBottom: theme.spacing?.md || 16,
  },
});

export default CasaEntryPoint;
