import React from "react";
import {
  View,
  StyleSheet,
  ImageSourcePropType,
  ViewStyle,
  Image,
} from "react-native";
// import type { LucideIcon } from "lucide-react-native";
type LucideIcon = any; // Placeholder
import { Logo } from "../atoms/Logo";
import { Label } from "../atoms/Label";
import { Button } from "../atoms/Button";
import { Card } from "../atoms/Card";
import { theme } from "../../../theme/theme";

type SelectableAccountCardProps = {
  /** Primary text (name, bank name, etc.) */
  title: string;
  /** Secondary text (account number, role, etc.) */
  subtitle?: string;
  /** Image source for avatar or logo */
  imageSource?: ImageSourcePropType;
  /** Type of image to display */
  imageType?: "avatar" | "logo";
  /** Image size */
  imageSize?: number;
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
 * SelectableAccountCard Molecule
 *
 * An actionable card component that displays avatar/logo with text and an action button.
 * Focused on selection/action flows - distinct from AccountInfoCard (display only).
 * Perfect for account selection, beneficiary picking, bank choosing, etc.
 *
 * @example
 * ```tsx
 * // Select bank account
 * <SelectableAccountCard
 *   title="Maybank"
 *   subtitle="Account •••• 1234"
 *   imageSource={require('./maybank.png')}
 *   imageType="logo"
 *   buttonText="Select"
 *   onButtonPress={() => handleSelect('maybank')}
 * />
 *
 * // Choose recipient
 * <SelectableAccountCard
 *   title="John Doe"
 *   subtitle="Frequent recipient"
 *   imageSource={require('./john.png')}
 *   imageType="avatar"
 *   buttonText="Send Money"
 *   onButtonPress={() => initiateTransfer('john')}
 *   buttonIcon="send"
 * />
 * ```
 */
export const SelectableAccountCard: React.FC<SelectableAccountCardProps> = ({
  title,
  subtitle,
  imageSource,
  imageType = "avatar",
  imageSize = 48,
  buttonText,
  onButtonPress,
  buttonIcon,
  style,
}) => {
  return (
    <Card variant="light" radius="md" style={style}>
      <Card.Body style={styles.body}>
        <View style={styles.container}>
          {/* Image: Avatar or Logo */}
          {imageSource && (
            <View style={styles.imageWrapper}>
              {imageType === "avatar" ? (
                <Image
                  source={imageSource}
                  style={[
                    styles.avatar,
                    {
                      width: imageSize,
                      height: imageSize,
                      borderRadius: imageSize / 2,
                    },
                  ]}
                  resizeMode="cover"
                />
              ) : (
                <Logo
                  source={imageSource}
                  width={imageSize}
                  height={imageSize}
                  resizeMode="contain"
                />
              )}
            </View>
          )}

          {/* Text Content */}
          <View style={styles.textContainer}>
            <Label size="large" weight="bold" style={styles.title}>
              {title}
            </Label>
            {subtitle && (
              <Label
                size="small"
                weight="regular"
                color="muted"
                style={styles.subtitle}
              >
                {subtitle}
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
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  imageWrapper: {
    marginRight: theme.spacing.md,
  },
  avatar: {
    backgroundColor: "#E0E0E0",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    marginBottom: 4,
  },
  subtitle: {
    marginTop: 2,
  },
  buttonWrapper: {
    marginLeft: theme.spacing.sm,
  },
});
