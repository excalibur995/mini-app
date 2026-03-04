import React from "react";
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Toggle } from "../atoms/Toggle";
import { theme } from "../../../theme/theme";

export interface TransferAmountFormProps {
  /** Recipient information */
  recipientName: string;
  recipientBank: string;
  recipientAccount: string;
  recipientInitials?: string;
  recipientBankIcon?: ImageSourcePropType;

  /** From account information */
  fromAccountName: string;
  fromAccountNumber: string;
  fromBalance: string;
  fromBankLogo?: ImageSourcePropType;

  /** Amount input */
  amount: string;
  onAmountChange: (amount: string) => void;
  currency?: string;

  /** Schedule/recurring toggle */
  isRecurring?: boolean;
  onRecurringToggle?: (value: boolean) => void;

  /** Change account button */
  onChangeAccount?: () => void;
}

/**
 * TransferAmountEntry Organism
 *
 * Complete entry screen for transfer amount with recipient info, from account, and amount input.
 * Matches the design with recipient card, from card, amount input with yellow border, and schedule toggle.
 */
export const TransferAmountForm: React.FC<TransferAmountFormProps> = ({
  recipientName,
  recipientBank,
  recipientAccount,
  recipientInitials = "MI",
  recipientBankIcon,
  fromAccountName,
  fromAccountNumber,
  fromBalance,
  fromBankLogo,
  amount,
  onAmountChange,
  currency = "IDR",
  isRecurring = false,
  onRecurringToggle,
  onChangeAccount,
}) => {
  const handleAmountChange = (text: string) => {
    // Remove all non-digit characters except decimal point
    const cleaned = text.replace(/[^0-9.]/g, "");

    // Prevent multiple decimal points
    const parts = cleaned.split(".");
    if (parts.length > 2) {
      return;
    }

    // Format with commas
    let formatted = cleaned;
    if (parts[0]) {
      const integerPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      formatted = parts.length > 1 ? `${integerPart}.${parts[1]}` : integerPart;
    }

    onAmountChange(formatted);
  };

  return (
    <View style={styles.container}>
      {/* Recipient Card - Gray background */}
      <View style={styles.recipientCard}>
        <View style={styles.recipientAvatar}>
          <Text style={styles.avatarText}>{recipientInitials}</Text>
          {recipientBankIcon && (
            <View style={styles.bankBadge}>
              <Image
                source={recipientBankIcon}
                style={styles.bankIcon}
                resizeMode="contain"
              />
            </View>
          )}
        </View>
        <View style={styles.recipientInfo}>
          <Text style={{ marginBottom: 4 }}>
            <Text style={styles.recipientLabel}>To </Text>
            <Text style={styles.recipientName}>{recipientName}</Text>
          </Text>
          <Text style={styles.recipientBank}>{recipientBank}</Text>
          <Text style={styles.recipientAccount}>{recipientAccount}</Text>
        </View>
      </View>

      {/* From Section - White card with gray border */}
      <View style={styles.fromCard}>
        <View style={styles.fromSection}>
          <View style={styles.fromMainContent}>
            {fromBankLogo && (
              <Image
                source={fromBankLogo}
                style={styles.bankLogo}
                resizeMode="contain"
              />
            )}
            <View style={styles.fromInfo}>
              <Text style={{ marginBottom: 4 }}>
                <Text style={styles.fromLabel}>From </Text>
                <Text style={styles.fromAccountName}>{fromAccountName}</Text>
              </Text>
              <Text style={styles.fromAccountNumber}>{fromAccountNumber}</Text>
              <Text style={styles.fromBalance}>{fromBalance}</Text>
            </View>
          </View>
          {onChangeAccount && (
            <TouchableOpacity
              style={styles.changeButton}
              onPress={onChangeAccount}
            >
              <Text style={styles.changeButtonText}>Change</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Amount Section - Yellow border card */}
      <View style={styles.amountCard}>
        <View style={styles.amountSection}>
          <Text style={styles.amountLabel}>Amount</Text>
          <View style={styles.amountInputContainer}>
            <Text style={styles.currencyText}>{currency}</Text>
            <TextInput
              style={styles.amountInput}
              value={amount}
              onChangeText={handleAmountChange}
              placeholder="0.00"
              placeholderTextColor="#d1d5db"
              keyboardType="numeric"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    paddingHorizontal: theme.spacing.md,
  },
  // Recipient Card - Gray background
  recipientCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  recipientAvatar: {
    position: "relative",
    marginRight: 12,
  },
  avatarText: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#e5e7eb",
    textAlign: "center",
    lineHeight: 48,
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  bankBadge: {
    position: "absolute",
    right: -4,
    bottom: -4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#dc2626",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#dc2626",
  },
  bankIcon: {
    width: 16,
    height: 16,
  },
  recipientInfo: {
    flex: 1,
  },
  recipientLabel: {
    fontSize: 12,
    color: "#000",
    marginBottom: 2,
    fontWeight: 500,
  },
  recipientName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  recipientBank: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 4,
  },
  recipientAccount: {
    fontSize: 13,
    color: "#6b7280",
  },
  // From Card - White with gray border
  fromCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginBottom: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  fromSection: {
    padding: 16,
    position: "relative",
  },
  fromMainContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  bankLogo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  fromInfo: {
    flex: 1,
  },
  fromLabel: {
    fontSize: 12,
    color: "#000",
    fontWeight: "500",
  },
  fromAccountName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
    marginBottom: 4,
  },
  fromAccountNumber: {
    fontSize: 13,
    color: "#6b7280",
    marginBottom: 4,
  },
  fromBalance: {
    fontSize: 13,
    fontWeight: "600",
    color: "#000",
  },
  changeButton: {
    position: "absolute",
    bottom: 0,
    right: 16,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    marginBottom: 12,
    borderColor: "#000",
    backgroundColor: "#fff",
  },
  changeButtonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
  },
  // Amount Card - Yellow border
  amountCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#ffc83d",
    marginBottom: 16,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  amountSection: {
    padding: 16,
  },
  amountLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 12,
  },
  amountInputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencyText: {
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontSize: 32,
    fontWeight: "700",
    color: "#000",
    padding: 0,
  },
  scheduleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
  },
  scheduleText: {
    fontSize: 14,
    color: "#000",
    fontWeight: 600,
  },
});
