import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ViewStyle,
  Text,
} from "react-native";
import { Icon } from "../atoms";
import { theme } from "../../../theme/theme";

interface IconButtonProps {
  iconName: string;
  size?: number;
  label: string;
  borderRadius?: number;
  onPress?: () => void;
  style?: ViewStyle;
}

export const IconButton: React.FC<IconButtonProps> = ({
  iconName = "account-balance",
  size = 56,
  label = "Account Number",
  borderRadius = theme.radius.md,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      style={[styles.container, style]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.iconWrapper,
          { width: size, height: size, borderRadius },
        ]}
      >
        <Icon icon={iconName} size={28} color={theme.colors.text} />
      </View>
      <Text
        style={[styles.label, { width: size * 1.5 }]}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginHorizontal: 0,
  },
  iconWrapper: {
    backgroundColor: theme.colors.card,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing.xs,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  label: {
    fontSize: theme.typography.fontSize.small,
    textAlign: "center",
    color: theme.colors.text,
  },
});
