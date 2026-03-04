import { View, StyleSheet, Text } from "react-native";
import { Label } from "../atoms";
import { IconButton } from "../molecules";
import { theme } from "../../../theme/theme";

type FooterProps = {
  // Add any props if needed in the future
  onPress?: () => void;
};

export const Footer: React.FC<FooterProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      {/* First Row */}
      <View style={styles.row}>
        <Text style={styles.newTransferText}>New transfer</Text>
      </View>

      {/* Second Row */}
      <View style={styles.row}>
        <IconButton
          iconName="account-balance"
          label="Account number"
          onPress={onPress}
          borderRadius={16}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: theme.spacing.lg,
    gap: theme.spacing.sm,
    backgroundColor: theme.colors.background,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
  },
  row: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  newTransferText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#9ca3af",
  },
});
