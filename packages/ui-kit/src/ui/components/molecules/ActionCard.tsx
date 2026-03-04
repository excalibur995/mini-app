import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
// import type { LucideIcon } from "lucide-react-native";
type LucideIcon = any; // Placeholder
import { Label } from "../atoms/Label";
import { Button } from "../atoms/Button";
import { Card } from "../atoms/Card";
import { theme } from "../../../theme/theme";

type ActionCardProps = {
  /** Primary text (title, message, prompt) */
  label: string;
  /** Secondary text (optional description) */
  description?: string;
  /** Button text */
  buttonText: string;
  /** Callback when button is pressed */
  onButtonPress: () => void;
  /** Optional Lucide icon for button */
  buttonIcon?: LucideIcon;
  /** Optional custom styles */
  style?: ViewStyle;
};

/**
 * ActionCard Molecule
 *
 * A simple, focused card with a label and action button.
 * Perfect for CTAs, prompts, quick actions, confirmations, etc.
 *
 * @example
 * ```tsx
 * // Simple CTA
 * <ActionCard
 *   label="Add a recipient"
 *   buttonText="Add Now"
 *   onButtonPress={() => navigate('AddRecipient')}
 * />
 *
 * // With description
 * <ActionCard
 *   label="Verify your account"
 *   description="Complete verification to unlock all features"
 *   buttonText="Verify"
 *   onButtonPress={handleVerify}
 *   buttonIcon="check"
 * />
 *
 * // Quick action
 * <ActionCard
 *   label="Link your bank account"
 *   buttonText="Link Account"
 *   onButtonPress={handleLink}
 * />
 * ```
 */
export const ActionCard: React.FC<ActionCardProps> = ({
  label,
  description,
  buttonText,
  onButtonPress,
  buttonIcon,
  style,
}) => {
  return (
    <Card variant="light" radius="md" style={style}>
      <Card.Body style={styles.body}>
        <View style={styles.content}>
          {/* Text Content */}
          <View style={styles.textContainer}>
            <Label size="large" weight="bold">
              {label}
            </Label>
            {description && (
              <Label
                size="small"
                weight="regular"
                color="muted"
                style={styles.description}
              >
                {description}
              </Label>
            )}
          </View>

          {/* Action Button */}
          <View style={styles.buttonWrapper}>
            <Button
              title={buttonText}
              onPress={onButtonPress}
              iconRight={buttonIcon}
            />
          </View>
        </View>
      </Card.Body>
    </Card>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: theme.spacing.md,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    marginRight: theme.spacing.md,
  },
  description: {
    marginTop: 4,
  },
  buttonWrapper: {
    // Button naturally sized
  },
});
