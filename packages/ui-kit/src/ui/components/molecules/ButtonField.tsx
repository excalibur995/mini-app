import React from "react";
import { ViewStyle } from "react-native";
// import type { LucideIcon } from "lucide-react-native";
type LucideIcon = any; // Placeholder
import { Button } from "../atoms/Button";

type ButtonFieldProps = {
  /** Button text */
  title: string;
  /** Callback when button is pressed */
  onPress: () => void;
  /** Optional Lucide icon to display on left */
  iconLeft?: LucideIcon;
  /** Optional Lucide icon to display on right */
  iconRight?: LucideIcon;
  /** Button size */
  size?: "sm" | "md" | "lg";
  /** Background color */
  backgroundColor?: string;
  /** Text color */
  textColor?: string;
  /** Full width button */
  fullWidth?: boolean;
  /** Optional custom styles */
  style?: ViewStyle;
};

/**
 * ButtonField Molecule
 *
 * Molecule wrapper around the Button atom.
 * Provides a molecule-level interface for organisms to use buttons
 * without directly importing atoms.
 *
 * @example
 * ```tsx
 * <ButtonField
 *   title="Submit"
 *   onPress={handleSubmit}
 *   iconRight="arrow-forward"
 *   fullWidth
 * />
 * ```
 */
export const ButtonField: React.FC<ButtonFieldProps> = ({
  title,
  onPress,
  iconLeft,
  iconRight,
  size,
  backgroundColor,
  textColor,
  fullWidth = false,
  style,
}) => {
  return (
    <Button
      title={title}
      onPress={onPress}
      iconLeft={iconLeft}
      iconRight={iconRight}
      size={size}
      backgroundColor={backgroundColor}
      textColor={textColor}
      fullWidth={fullWidth}
      style={style}
    />
  );
};
