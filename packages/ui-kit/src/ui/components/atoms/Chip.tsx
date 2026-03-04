// src/atoms/Chip.tsx
import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  ViewStyle,
  TextStyle,
} from "react-native";
// import { X } from "lucide-react-native";
const X = (props: any) => null; // Placeholder
import { theme } from "../../../theme/theme";

type ChipVariant = "selectable" | "display";

type ChipProps = {
  title: string;
  variant?: ChipVariant;
  isSelected?: boolean;
  onPress?: () => void;
  iconLeft?: React.ComponentType<any>;
  iconRight?: React.ComponentType<any>;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export const Chip: React.FC<ChipProps> = ({
  title,
  variant = "selectable",
  isSelected = false,
  onPress,
  iconLeft,
  iconRight,
  style,
  textStyle,
}) => {
  const isClickable = variant === "selectable";

  const getBackgroundColor = () => {
    if (variant === "display") {
      return theme.colors.gray?.light || "#f3f4f6";
    }
    return isSelected ? "#000000" : "#ffffff";
  };

  const getTextColor = () => {
    if (variant === "display") {
      return "#000000";
    }
    return isSelected ? "#ffffff" : "#000000";
  };

  const getBorderColor = () => {
    if (variant === "display") {
      return "transparent";
    }
    return isSelected ? "#000000" : "#d1d5db";
  };

  // Check if this is a "+" button (circular)
  const isAddButton = title === "+";

  const containerStyle = [
    styles.chip,
    {
      backgroundColor: getBackgroundColor(),
      borderWidth: 1,
      borderColor: getBorderColor(),
    },
    isAddButton && styles.addButton,
    style,
  ];

  const IconLeft = iconLeft;
  const IconRight = iconRight;

  const content = (
    <View style={styles.content}>
      {IconLeft && (
        <IconLeft size={16} color={getTextColor()} style={styles.iconLeft} />
      )}
      <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
        {title}
      </Text>
      {IconRight && (
        <IconRight size={16} color={getTextColor()} style={styles.iconRight} />
      )}
    </View>
  );

  if (!isClickable) {
    return <View style={containerStyle}>{content}</View>;
  }

  return (
    <TouchableOpacity
      style={containerStyle}
      onPress={onPress}
      activeOpacity={0.7}
      disabled={!isClickable}
    >
      {content}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    paddingVertical: 0,
    paddingHorizontal: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 14,
    fontWeight: "600",
  },
  iconLeft: {
    marginRight: theme.spacing.xs,
  },
  iconRight: {
    marginLeft: theme.spacing.xs,
  },
});
