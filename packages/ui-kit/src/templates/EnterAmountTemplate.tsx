import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { theme } from "../theme/theme";
import { Button } from "../ui/components/atoms";
import { AccountDetail } from "../ui/components/molecules/AccountDetail";
import { Header } from "../ui/components/molecules/Header";
import { AccountCard } from "../ui/components/organisms/AccountCard";
import { AccountListModal } from "../ui/components/organisms/AccountListModal";
import { ScheduleRecurring } from "../ui/components/organisms/ScheduleRecurring";

export interface EnterAmountTemplateProps {
  onNext?: () => void;
  currentStep?: number;
}

interface RecurrenceOption {
  value?: string;
  label?: string;
}

export const EnterAmountTemplate: React.FC<EnterAmountTemplateProps> = ({
  onNext,
  currentStep,
}) => {
  const [amount, setAmount] = useState<string>("");
  const [recurringEnabled, setRecurringEnabled] = useState<boolean>(false);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [selectedRecurrence, setSelectedRecurrence] = useState<
    string | undefined
  >(undefined);

  const canNext =
    amount.trim() !== "" &&
    (!recurringEnabled || (recurringEnabled && !!selectedRecurrence));

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      style={styles.scroll}
      // keyboardShouldPersistTaps="handled"
    >
      <View style={styles.headerContainer}>
        <Header
          variant="var2"
          title={currentStep === 1 ? "Enter Amount" : "Transfer"}
          rightIconName={currentStep === 1 ? "close" : "chevron-right"}
        />
      </View>
      <View style={styles.row}>
        <AccountDetail />
      </View>

      <View style={styles.row}>
        <AccountCard
          accountName="Syazwina"
          accountNumber="1234 5678 9012"
          balance="1,000.00"
          currency="SGD"
          showChangeButton={true}
          showAmountInput={true}
          onChangeAccount={() => setShowAccountModal(true)}
          amountValue={amount}
          onAmountChange={(val) => setAmount(val)}
        />
      </View>

      <AccountListModal
        visible={showAccountModal}
        onClose={() => setShowAccountModal(false)}
        onSelectAccount={(acct) => setSelectedAccount(acct)}
      />

      <View style={styles.row}>
        <ScheduleRecurring
          onToggleChange={(v) => {
            setRecurringEnabled(v);
            if (!v) setSelectedRecurrence(undefined);
          }}
          onSelectRecurrence={(opt: RecurrenceOption) => {
            const value = opt?.value ?? opt?.label;
            setSelectedRecurrence(value);
          }}
        />
      </View>

      <View style={styles.buttonRow}>
        <Button
          title="Next"
          onPress={() => canNext && onNext?.()}
          backgroundColor={
            canNext ? theme.colors.primary : theme.colors.gray.medium
          }
          textColor={canNext ? theme.colors.text : theme.colors.muted}
        />
      </View>
    </ScrollView>
  );
};

export default EnterAmountTemplate;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: theme.spacing.lg,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.md,
  },
  row: {
    width: "100%",
  },
  scroll: {
    flex: 1,
  },
  buttonRow: {
    width: "100%",
    marginTop: theme.spacing.sm,
  },
  headerContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
});
