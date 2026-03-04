import { StyleSheet, View } from 'react-native';
import React, { useState, useMemo } from 'react';
import { Button, Header, theme, TransferMethodForm } from 'ui-kit';
import { TransferMethodScreenProps } from '../../navigation/types';
import { useAdapter, useJourneyNavigation } from '../../hooks';
import { parseAmount } from '../../utils';

export const TransferMethodScreen: React.FC<TransferMethodScreenProps> = ({
  route,
  navigation,
}) => {
  const { transferData } = route.params || {};
  const { navigate } = useJourneyNavigation('TransferMethodScreen');
  const [_selectedMethod, _setSelectedMethod] = useState<string>('1'); // Default to first method

  const adapter = useAdapter();

  const transferModes = useMemo(
    () => adapter.transfer.getTransferModes(),
    [adapter],
  );

  const handlePress = () => {
    if (!transferData) return;

    const selectedModeData = transferModes.find(
      (m): any => m.id === _selectedMethod,
    );
    const transferMethod = selectedModeData?.title || transferModes[0]?.title;
    const amount = parseAmount(transferData.amount);

    // Calculate fee using adapter
    const transferFee = adapter.fee.calculateFee(amount, transferMethod);

    navigate({
      transferData,
      transferMethod,
      transferFee,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header
          title="Transfer"
          variant="var2"
          leftIconName="back"
          onLeftPress={() => navigation.goBack()}
        />
      </View>
      <View style={styles.transferModeContainer}>
        <TransferMethodForm transferModes={transferModes} />
        <Button title="Next" onPress={handlePress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  headerContainer: {
    backgroundColor: theme.colors.background,
  },
  transferModeContainer: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
});

export default TransferMethodScreen;
