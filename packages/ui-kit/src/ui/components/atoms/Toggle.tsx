// src/atoms/Toggle.tsx
import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Animated } from "react-native";
// import { Check } from "lucide-react-native";
const Check = (props: any) => null; // Placeholder
import { theme } from "../../../theme/theme";

type ToggleProps = {
  value?: boolean;
  onChange?: (val: boolean) => void;
  width?: number;
  height?: number;
  circleSize?: number;
  mutedColor?: string;
  activeColor?: string;
  tickColor?: string;
};

export const Toggle: React.FC<ToggleProps> = ({
  value = false,
  onChange,
  width = 60,
  height = 32,
  circleSize = 28,
  mutedColor = theme.colors.muted,
  activeColor = theme.colors.success,
  tickColor = theme.colors.success,
}) => {
  const [internalValue, setInternalValue] = useState(value);
  const translateX = new Animated.Value(
    internalValue ? width - circleSize - 2 : 2
  );

  const toggle = () => {
    const newVal = !internalValue;
    setInternalValue(newVal);
    onChange?.(newVal);

    Animated.timing(translateX, {
      toValue: newVal ? width - circleSize - 2 : 2,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={toggle}
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius: height / 2,
          backgroundColor: internalValue ? activeColor : mutedColor,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.circle,
          {
            width: circleSize,
            height: circleSize,
            borderRadius: circleSize / 2,
            transform: [{ translateX }],
          },
        ]}
      >
        {internalValue && <Check size={circleSize * 0.6} color={tickColor} />}
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 2,
  },
  circle: {
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
});
