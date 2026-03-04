import React, { useCallback, useState } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import {
  BankList,
  FilteredTabs,
  Header,
  SearchInput,
  styles as commonStyles,
  theme,
} from 'ui-kit';
import { BankListScreenProps } from '../../navigation/types';
import { MOCK_BANK_DATA } from '../../constants/mockData';
import { FlatList } from 'react-native';
import { useJourneyNavigation } from '../../hooks';

const BankListScreen: React.FC<BankListScreenProps> = ({ navigation }) => {
  const [selectedTab, setSelectedTab] = useState('All');
  const { navigate } = useJourneyNavigation('BankListScreen');

  const handleItemSelect = useCallback(
    (item: any) => {
      // Use journey navigation with replace to dismiss modal and navigate
      navigate(
        {
          bank: {
            id: item.id,
            name: item.name,
            logoSource: item.logoSource,
          },
        },
        'replace',
      );
    },
    [navigate],
  );

  const handleClose = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={commonStyles.container}>
      <Header
        title="TransferTo"
        rightIconName="x"
        variant="var1"
        onRightPress={handleClose}
        showBorder={false}
      />
      <View style={styles.searchWrapper}>
        <SearchInput />
      </View>
      <FilteredTabs selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      <FlatList
        data={MOCK_BANK_DATA}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleItemSelect(item)}>
            <BankList name={item.name} logoSource={item.logoSource} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchWrapper: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md,
  },
  listContent: {
    paddingBottom: theme.spacing.lg,
  },
});

export default React.memo(BankListScreen);
