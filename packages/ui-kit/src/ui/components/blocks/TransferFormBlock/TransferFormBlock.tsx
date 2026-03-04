import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, ViewStyle } from "react-native";
import { Label } from "../../atoms/Label";
import { Input } from "../../atoms/Input";
import { Button } from "../../atoms/Button";
import { theme } from "../../../../theme/theme";

export interface TransferFormData {
  recipientAccount: string;
  recipientName: string;
  amount: string;
  tip?: string;
  description?: string;
}

export interface TransferFormBlockProps {
  onSubmit: (data: TransferFormData) => void;
  loading?: boolean;
  minAmount?: number;
  maxAmount?: number;
  containerStyle?: ViewStyle;
}

export const TransferFormBlock: React.FC<TransferFormBlockProps> = ({
  onSubmit,
  loading = false,
  minAmount = 0.01,
  maxAmount = 999999,
  containerStyle,
}: TransferFormBlockProps) => {
  const [recipientAccount, setRecipientAccount] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [amount, setAmount] = useState("");
  const [tip, setTip] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateAndSubmit = () => {
    const newErrors: Record<string, string> = {};

    if (!recipientAccount.trim()) {
      newErrors.recipientAccount = "Recipient account is required";
    }
    if (!recipientName.trim()) {
      newErrors.recipientName = "Recipient name is required";
    }
    if (!amount) {
      newErrors.amount = "Amount is required";
    } else {
      const numAmount = parseFloat(amount);
      if (isNaN(numAmount)) {
        newErrors.amount = "Invalid amount";
      } else if (numAmount < minAmount) {
        newErrors.amount = `Amount must be at least ${minAmount}`;
      } else if (numAmount > maxAmount) {
        newErrors.amount = `Amount must not exceed ${maxAmount}`;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    onSubmit({
      recipientAccount,
      recipientName,
      amount,
      tip,
      description,
    });
  };

  return (
    <ScrollView style={[styles.container, containerStyle]}>
      <Text style={styles.title}>Transfer Money</Text>

      <View style={styles.fieldContainer}>
        <Label size="small" weight="medium">
          Recipient Account *
        </Label>
        <Input
          value={recipientAccount}
          onChangeText={setRecipientAccount}
          placeholder="Enter account number"
        />
        {errors.recipientAccount && (
          <Text style={styles.errorText}>{errors.recipientAccount}</Text>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Label size="small" weight="medium">
          Recipient Name *
        </Label>
        <Input
          value={recipientName}
          onChangeText={setRecipientName}
          placeholder="Enter recipient name"
        />
        {errors.recipientName && (
          <Text style={styles.errorText}>{errors.recipientName}</Text>
        )}
      </View>

      <View style={styles.fieldContainer}>
        <Label size="small" weight="medium">
          Amount *
        </Label>
        <Input value={amount} onChangeText={setAmount} placeholder="0.00" />
        {errors.amount && <Text style={styles.errorText}>{errors.amount}</Text>}
      </View>

      <View style={styles.fieldContainer}>
        <Label size="small" weight="medium">
          Tip (Optional)
        </Label>
        <Input value={tip} onChangeText={setTip} placeholder="0.00" />
      </View>

      <View style={styles.fieldContainer}>
        <Label size="small" weight="medium">
          Description (Optional)
        </Label>
        <Input
          value={description}
          onChangeText={setDescription}
          placeholder="Add a note"
        />
      </View>

      <Button
        onPress={validateAndSubmit}
        title="Continue"
        size="lg"
        fullWidth
        style={styles.button}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: theme.spacing.md,
  },
  title: {
    marginBottom: theme.spacing.lg,
    fontSize: theme.typography.fontSize.xlarge,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },
  fieldContainer: {
    marginBottom: theme.spacing.md,
  },
  errorText: {
    marginTop: theme.spacing.xs,
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.error,
  },
  button: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xl,
  },
});
