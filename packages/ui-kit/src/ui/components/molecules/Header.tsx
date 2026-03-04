// libs/ui/src/molecules/Header.tsx
import React from "react";
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native";

// Import existing atoms
import { Icon, Label } from "../atoms";
import { theme } from "../../../theme/theme";

export interface HeaderProps {
  title: string;
  leftIconName?: string;
  rightIconName?: string;
  onLeftPress?: () => void;
  onRightPress?: () => void;
  containerStyle?: ViewStyle;
  iconSize?: number;
  iconColor?: string;
  style?: ViewStyle;
  variant?: "var1" | "var2";
  showBorder?: boolean;
  rightIconCircled?: boolean; // Add option for circled right icon
}

export const Header: React.FC<HeaderProps> = ({
  title,
  leftIconName,
  rightIconName,
  onLeftPress,
  onRightPress,
  iconSize,
  iconColor,
  variant = "var1",
  showBorder = true,
  rightIconCircled = false,
}) => {
  const renderRightIcon = () => {
    if (!rightIconName) {
      return <View style={styles.iconWrapper} />;
    }

    const iconElement = (
      <Icon
        icon={rightIconName}
        size={iconSize || 20}
        color={iconColor || theme.colors.text}
      />
    );

    if (rightIconCircled) {
      return (
        <TouchableOpacity
          onPress={onRightPress}
          style={styles.circledIconWrapper}
        >
          {iconElement}
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity onPress={onRightPress} style={styles.iconWrapper}>
        {iconElement}
      </TouchableOpacity>
    );
  };

  if (variant === "var1") {
    return (
      <View style={[styles.container, !showBorder && styles.noBorder]}>
        {leftIconName ? (
          <TouchableOpacity onPress={onLeftPress} style={styles.iconWrapper}>
            <Icon
              icon={leftIconName}
              size={iconSize || 24}
              color={iconColor || theme.colors.text}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconWrapper} />
        )}

        <View style={styles.titleWrapper}>
          <Label size="large" weight="bold">
            {title}
          </Label>
        </View>

        {renderRightIcon()}
      </View>
    );
  } else {
    return (
      <View style={[styles.containervar2]}>
        {/* Left Icon (Back Button) */}
        {leftIconName ? (
          <TouchableOpacity onPress={onLeftPress} style={styles.iconWrapper}>
            <Icon
              icon={leftIconName}
              size={iconSize || 24}
              color={iconColor || theme.colors.text}
            />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconWrapper} />
        )}

        {/* Atom 1: The Title Label */}
        <Label weight="bold" size="large">
          {title}
        </Label>

        {/* Atom 2: The Right Icon */}
        {renderRightIcon()}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  containervar2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  iconWrapper: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  circledIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: theme.colors.gray.medium,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors.background,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.md - 4,
    backgroundColor: theme.colors.background,
    borderBottomWidth: 0,
    borderBottomColor: theme.colors.border,
  },
  noBorder: {
    borderBottomWidth: 0,
  },
  titleWrapper: {
    flex: 1,
    alignItems: "center",
  },
});
