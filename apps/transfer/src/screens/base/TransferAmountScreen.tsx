import React, { useState, useCallback, useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  styles as commonStyles,
  Header,
  TransferAmountForm,
  Button,
  theme,
  Toggle,
} from 'ui-kit';
import { TransferAmountScreenProps } from '../../navigation/types';
import { Text } from 'react-native';
import { getCurrency } from '../../utils';
import { useJourneyNavigation } from '../../hooks';

const TransferAmountScreen: React.FC<TransferAmountScreenProps> = ({
  route,
  navigation,
}) => {
  const { recipient, fromAccount } = route.params || {};
  const { navigate } = useJourneyNavigation('TransferAmountScreen');

  const [amount, setAmount] = useState<string>('');
  const [isScheduled, setIsScheduled] = useState<boolean>(false);

  const canNext = useMemo(() => amount.trim() !== '', [amount]);

  const handleNext = useCallback(async () => {
    if (!canNext || !recipient || !fromAccount) return;

    const transferData = {
      recipient,
      fromAccount,
      amount,
      currency: getCurrency(),
      isScheduled,
      isRecurring: false,
    };

    navigate({
      transferData,
    });
  }, [canNext, navigate, recipient, fromAccount, amount, isScheduled]);

  return (
    <View style={commonStyles.container}>
      <Header
        variant="var2"
        title="Transfer"
        leftIconName="back"
        onLeftPress={() => navigation.goBack()}
      />
      <TransferAmountForm
        recipientName={recipient?.name || ''}
        recipientBank={recipient?.bank || ''}
        recipientAccount={recipient?.accountNumber || ''}
        recipientInitials={recipient?.initials || ''}
        recipientBankIcon={recipient?.bankLogo}
        fromAccountName={fromAccount?.accountName || ''}
        fromAccountNumber={fromAccount?.accountNumber || ''}
        fromBalance={fromAccount?.balance || ''}
        fromBankLogo={fromAccount?.bankLogo}
        amount={amount}
        onAmountChange={setAmount}
        currency={getCurrency()}
        isRecurring={false}
        onRecurringToggle={() => {}}
      />
      <View style={styles.scheduleContainer}>
        <Text style={styles.scheduleText}>Schedule or set recurring</Text>
        <Toggle
          value={isScheduled}
          onChange={setIsScheduled}
          width={48}
          height={26}
          circleSize={22}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Next"
          onPress={handleNext}
          backgroundColor={canNext ? '#ffc83d' : '#f5f5f5'}
          textColor={canNext ? '#000000' : '#9ca3af'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: theme.spacing.md,
  },
  scheduleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: 16,
    marginBottom: 'auto',
  },
  scheduleText: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default React.memo(TransferAmountScreen);
