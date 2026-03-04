import {
  ConfirmationTransferTo,
  Header,
  images,
  Slider,
  theme,
  TransactionDetails,
} from 'ui-kit';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { TransferConfirmationProps } from '../../navigation/types';
import { useAdapter } from '../../hooks';
import { parseAmount, getCurrency } from '../../utils';

const TransferConfirmationScreen: React.FC<TransferConfirmationProps> = ({
  route,
  navigation,
}) => {
  const { transferData, transferMethod, transferFee } = route.params || {};

  const adapter = useAdapter();

  const currency = getCurrency();
  const transferAmountNum = transferData ? parseAmount(transferData.amount) : 0;
  const totalAmount = adapter.fee.calculateTotal(
    transferAmountNum,
    transferFee || 0,
  );

  return (
    <View style={styles.container}>
      <Header
        title="Confirmation"
        variant="var2"
        leftIconName="back"
        onLeftPress={() => navigation.goBack()}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <ConfirmationTransferTo
          variant="variant3"
          name={transferData?.recipient.name || ''}
          bank={transferData?.recipient.bank || ''}
          accountNumber={transferData?.recipient.accountNumber || ''}
          source={images.xcel}
          badgeSource={
            transferData?.recipient.bankLogo
              ? transferData.recipient.bankLogo
              : images.cimb
          }
          transferAmount={transferAmountNum}
          total={totalAmount}
          transferFrom={`${transferData?.fromAccount.accountName || ''} ${
            transferData?.fromAccount.accountNumber || ''
          }`}
          currency={currency as 'IDR' | 'MYR'}
        />
        <TransactionDetails
          type="Transfer"
          mode={transferMethod || ''}
          purpose="Fund Transfer"
          remark="Makan"
          notifyEmail="email@gmail.com"
        />

        <Slider onComplete={() => {}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  contentContainer: {
    gap: 24,
    paddingBottom: 32,
  },
});

export default React.memo(TransferConfirmationScreen);
