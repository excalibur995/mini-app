import React from "react";
import { StyleProp, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ScreenProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

/**
 * Screen Component
 *
 * Wrapper component that provides SafeAreaView from react-native-safe-area-context.
 * Use this instead of importing SafeAreaView directly in every screen.
 *
 * @example
 * ```tsx
 * <Screen style={styles.container}>
 *   <YourContent />
 * </Screen>
 * ```
 */
export const Screen: React.FC<ScreenProps> = ({ children, style }) => {
  return <SafeAreaView style={[{ flex: 1 }, style]}>{children}</SafeAreaView>;
};
