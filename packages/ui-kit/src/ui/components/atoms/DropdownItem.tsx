import React from "react";
import { StyleSheet, Pressable, Text, View } from "react-native";
// import { Check } from "lucide-react-native";
const Check = (props: any) => null; // Placeholder
import { theme } from "../../../theme/theme";

export interface DropdownItemProps {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  label,
  selected = false,
  onPress,
}) => {
  return (
    <Pressable
      style={[styles.container, selected && styles.selectedContainer]}
      onPress={onPress}
    >
      <Text style={styles.label}>{label}</Text>
      {selected && (
        <View style={styles.checkCircle}>
          <Check size={20} color={theme.colors.background} />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedContainer: {
    backgroundColor: theme.colors.gray.light,
  },
  label: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.medium,
    color: theme.colors.text,
  },
  checkCircle: {
    backgroundColor: theme.colors.success,
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: "center",
    alignItems: "center",
  },
});
