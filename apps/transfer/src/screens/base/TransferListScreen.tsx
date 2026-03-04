import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Header,
  Footer,
  RadioTab,
  styles as commonStyles,
  ChipList,
  SearchInput,
  theme,
  AccountList,
} from 'ui-kit';
import {
  MOCK_ACCOUNT_CATEGORIES,
  MOCK_ACCOUNT_DATA,
} from '../../constants/mockData';
import { TransferListScreenProps } from '../../navigation/types';
import { useJourneyNavigation } from '../../hooks';

const TransferListScreen: React.FC<TransferListScreenProps> = () => {
  const { navigate } = useJourneyNavigation('TransferListScreen');

  const handleNavigateTransfer = useCallback(() => {
    navigate();
  }, [navigate]);

  return (
    <View style={commonStyles.container}>
      <Header
        title="Transfer"
        leftIconName="arrow-back-ios"
        rightIconName="more-horiz"
        variant="var1"
        showBorder={false}
      />
      <RadioTab
        tabs={['Local', 'Overseas']}
        onTabChange={tab => console.log('Selected Tab:', tab)}
      />
      <View style={styles.searchWrapper}>
        <SearchInput />
        <ChipList data={MOCK_ACCOUNT_CATEGORIES} />
      </View>
      <AccountList data={MOCK_ACCOUNT_DATA} />
      <Footer onPress={handleNavigateTransfer} />
    </View>
  );
};

const styles = StyleSheet.create({
  searchWrapper: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.sm,
    paddingBottom: theme.spacing.xs,
    gap: 12,
  },
});

export default React.memo(TransferListScreen);
