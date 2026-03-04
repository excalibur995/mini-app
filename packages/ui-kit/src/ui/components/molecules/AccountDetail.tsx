import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Avatar, Label } from "../atoms";
import { theme } from "../../../theme/theme";

export interface AccountDetailProps {
  name?: string;
  nickname?: string;
  accountNumber?: string;
  bank?: string;
  source?: { uri: string };
  badgeSource?: { uri: string };
  avatarColor?: string;
  transferAmount?: number;
  currency?: "IDR" | "MYR" | "SGD";
  variant?: "variant1" | "variant2" | "variant3" | "transfer-confirmation";
  textAlign?: string;
}

function formatNumber(amount: number): string {
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export const AccountDetail: React.FC<AccountDetailProps> = ({
  name = "Muhammad Nasi Yam bin Kuah Kacang Pekat",
  nickname = "Personal Account",
  accountNumber = "1234 1234 1234 1234",
  bank = "Bank of Examples",
  source,
  badgeSource,
  avatarColor,
  transferAmount = 1000,
  currency = "IDR",
  variant = "variant1",
  textAlign,
}) => {
  const bankInfo = `${accountNumber} • ${bank}`;
  const transferInfo = `${currency} ${formatNumber(transferAmount)}`;

  return (
    <View
      style={[
        styles.row,
        {
          backgroundColor:
            variant === "variant1"
              ? theme.colors.background
              : variant === "variant2"
              ? theme.colors.card
              : variant === "variant3"
              ? "transparent"
              : "#f5f5f5", // transfer-confirmation
          borderRadius: variant === "transfer-confirmation" ? 12 : 0,
          paddingHorizontal: variant === "transfer-confirmation" ? 16 : 0,
          paddingVertical:
            variant === "transfer-confirmation" ? 16 : theme.spacing.sm + 2,
        },
      ]}
    >
      <View style={styles.avatarContainer}>
        <Avatar
          source={source}
          badgeSource={badgeSource}
          name={name}
          size={56}
          backgroundColor={avatarColor}
        />
      </View>

      {variant === "variant1" ? (
        <View style={styles.textContainer}>
          <Label color="text" weight="bold" size="medium">
            {name}
          </Label>
          {nickname ? (
            <Label color="muted" weight="regular" size="small">
              {nickname}
            </Label>
          ) : null}
          <Label color="muted" weight="regular" size="small">
            {bankInfo}
          </Label>
        </View>
      ) : variant === "variant2" ? (
        <View style={styles.textContainerRight}>
          <Label color="text" weight="medium" size="medium" textAlign="right">
            {name}
          </Label>
          <Label color="text" weight="bold" size="large">
            {transferInfo}
          </Label>
        </View>
      ) : variant === "variant3" ? (
        <View style={styles.textContainerRight1}>
          <Text
            style={{
              fontSize: 14,
              color: "#000",
              fontWeight: "700",
              marginBottom: 4,
              textAlign: "right",
            }}
          >
            {name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: "#9E9E9E",
              fontWeight: "400",
              marginBottom: 2,
            }}
          >
            {bank}
          </Text>
          <Text style={{ fontSize: 14, color: "#9E9E9E", fontWeight: "400" }}>
            {accountNumber}
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <Text style={{ marginBottom: 4 }}>
            <Text style={{ fontSize: 12, color: "#000", fontWeight: "400" }}>
              {"To "}
            </Text>
            <Text style={{ fontSize: 14, color: "#000", fontWeight: "600" }}>
              {name}
            </Text>
          </Text>
          <Text style={{ fontSize: 13, color: "#6b7280", marginBottom: 4 }}>
            {bank}
          </Text>
          <Text style={{ fontSize: 13, color: "#6b7280" }}>
            {accountNumber}
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 0,
  },
  avatarContainer: {
    marginRight: theme.spacing.md,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: theme.colors.gray?.light,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.muted,
  },
  textContainer: {
    flex: 1,
    gap: theme.spacing.xs,
  },
  textRowTo: {
    fontSize: theme.typography.fontSize.small,
    color: theme.colors.muted,
    marginBottom: 2,
  },
  textRow1: {
    fontSize: theme.typography.fontSize.large - 2,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
  },
  textRow2: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.muted,
  },
  textRow3: {
    fontSize: theme.typography.fontSize.small + 2,
    color: theme.colors.muted,
  },
  textContainerRight: {
    flex: 1,
    gap: theme.spacing.xs,
    alignItems: "flex-end",
  },
  textContainerRight1: {
    flex: 1,
    gap: theme.spacing.xs,
    alignItems: "flex-end",
    padding: 0,
  },
  textRowRight: {
    fontWeight: theme.typography.fontWeight.bold,
    textAlign: "right",
  },
  textRowRight1: {
    fontSize: theme.typography.fontSize.large - 2,
    fontWeight: theme.typography.fontWeight.bold,
    color: theme.colors.text,
    textAlign: "right",
  },
  textRowRight2: {
    fontSize: theme.typography.fontSize.medium,
    color: theme.colors.muted,
    textAlign: "right",
  },
});
