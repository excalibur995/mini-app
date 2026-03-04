// src/components/CollapsibleHeader.tsx
import React from "react";
import { Animated, StyleSheet } from "react-native";
import { Header, HeaderProps } from "../molecules";
import { theme } from "../../../theme/theme";

type CollapsibleHeaderProps = HeaderProps & {
  scrollThreshold?: number;
  backgroundColor?: string;
  scrollY: Animated.Value;
};

export const CollapsibleHeader: React.FC<CollapsibleHeaderProps> = ({
  title = "placeholder",
  leftIconName = "arrow-back-ios",
  onLeftPress,
  scrollThreshold = 200,
  backgroundColor = theme.colors.background,
  scrollY,
}) => {
  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor,
        },
      ]}
    >
      <Header
        title={title}
        leftIconName={leftIconName}
        onLeftPress={onLeftPress}
        variant="var1"
        showBorder={false}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
  },
});
