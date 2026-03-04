import React, { useState } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { AccountDetail } from "../molecules/AccountDetail";
import { ButtonField } from "../molecules/ButtonField";
import { FormField } from "../molecules/FormField";
import { Input } from "../atoms/Input";
import { theme } from "../../../theme/theme";

export interface AccountCardProps {
  avatarSource?: { uri: string };
  badgeSource?: { uri: string };
  accountName: string;
  accountNumber: string;
  balance: string;
  nickname?: string;
  bank?: string;
  currency?: "IDR" | "MYR" | "SGD";
  amountValue?: string;
  onAmountChange?: (amount: string) => void;
  onChangeAccount?: () => void;
  showChangeButton?: boolean;
  showAmountInput?: boolean;
  style?: ViewStyle;
}

export const AccountCard: React.FC<AccountCardProps> = ({
  avatarSource,
  badgeSource,
  accountName,
  accountNumber,
  nickname,
  bank,
  balance,
  currency,
  amountValue = "",
  onAmountChange,
  onChangeAccount,
  showChangeButton = true,
  showAmountInput = true,
  style,
}) => {
  const [amount, setAmount] = useState(amountValue);

  const handleAmountChange = (text: string) => {
    setAmount(text);
    onAmountChange?.(text);
  };

  return (
    <View style={[styles.container, style]}>
      {/* Top Section: Molecule - AccountDetail */}
      <View style={styles.topSection}>
        <AccountDetail
          name={accountName}
          nickname={nickname}
          accountNumber={accountNumber}
          bank={bank}
          source={avatarSource}
          badgeSource={badgeSource}
          currency={currency}
          transferAmount={
            Number((balance || "").toString().replace(/[^0-9.-]+/g, "")) || 0
          }
          variant="variant1"
        />
      </View>

      {/* Middle Section: Molecule - ButtonField */}
      {showChangeButton && onChangeAccount && (
        <View style={styles.buttonSection}>
          <ButtonField
            title="Change"
            onPress={onChangeAccount}
            backgroundColor={theme.colors.primary}
            textColor={theme.colors.text}
            style={styles.changeBtn}
          />
        </View>
      )}

      {/* Bottom Section: Molecule - FormField with Input */}
      {showAmountInput && (
        <View style={styles.bottomSection}>
          <FormField label="Enter Amount">
            <Input
              value={amount}
              onChangeText={handleAmountChange}
              placeholder="0.00"
              size="lg"
              style={styles.amountInput}
            />
          </FormField>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: theme.spacing.md,
    ...theme.shadows.light,
  },
  topSection: {
    marginBottom: theme.spacing.md,
  },
  buttonSection: {
    alignItems: "flex-end",
    marginBottom: theme.spacing.md,
    marginTop: theme.spacing.xs,
  },
  changeBtn: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.sm,
  },
  bottomSection: {
    marginTop: theme.spacing.md,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.md,
  },
  amountInput: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.sm,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
});
