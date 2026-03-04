import React, { useState, useCallback, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  ButtonField,
  Header,
  RecipientDetailsForm,
  styles as commonStyles,
  theme,
  images,
} from 'ui-kit';
import { TransferAccountDetailScreenProps } from '../../navigation/types';
import { MOCK_BANK_DATA } from '../../constants/mockData';
import { formatAmount } from '../../utils';
import { useAdapter, useJourneyNavigation } from '../../hooks';

const TransferAccountDetailScreen: React.FC<
  TransferAccountDetailScreenProps
> = ({ route, navigation }) => {
  const { bank } = route.params || {};
  const { navigate } = useJourneyNavigation('TransferAccountDetailScreen');

  const [accountNumber, setAccountNumber] = useState('');
  const [selectedBank, setSelectedBank] = useState(bank?.name || '');

  const adapter = useAdapter();
  const bankOptions = useMemo(() => MOCK_BANK_DATA.map(b => b.name), []);

  // Mock recipient name - in real app this would come from API lookup
  const recipientName = 'Mohamad Irfan Zulkifli Hakimi bin Mohd Khairul Anuar';

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleNext = useCallback(() => {
    // Get selected bank logo
    const selectedBankData = MOCK_BANK_DATA.find(b => b.name === selectedBank);

    // Get balance from adapter
    const mockBalanceAmount = adapter.transfer.getMockBalance();
    const formattedBalance = formatAmount(mockBalanceAmount);

    navigate({
      recipient: {
        name: recipientName || 'Unknown Recipient',
        bank: selectedBank,
        accountNumber: accountNumber,
        initials: getInitials(recipientName || 'Unknown Recipient'),
        bankLogo: selectedBankData?.logoSource,
      },
      fromAccount: {
        accountName: 'U Transaction Account iB',
        accountNumber: '5012 3341 4612',
        balance: formattedBalance,
        bankLogo: images.maybankLogo,
      },
    });
  }, [navigate, selectedBank, accountNumber, recipientName, adapter]);

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={commonStyles.container}>
      <Header
        title="Transfer"
        leftIconName="arrow-back-ios"
        onLeftPress={handleBack}
      />
      <RecipientDetailsForm
        bankLabel="Transfer to"
        bankOptions={bankOptions}
        selectedBank={selectedBank}
        onBankSelect={setSelectedBank}
        accountNumber={accountNumber}
        onAccountNumberChange={setAccountNumber}
      />
      <View style={styles.buttonContainer}>
        <ButtonField title="Next" onPress={handleNext} fullWidth />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: theme.spacing.md,
  },
});

export default React.memo(TransferAccountDetailScreen);
