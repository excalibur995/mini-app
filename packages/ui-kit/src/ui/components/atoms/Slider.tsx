import React, { useRef } from "react";
import {
  View,
  StyleSheet,
  Animated,
  PanResponder,
  ViewStyle,
} from "react-native";
// import { ChevronsRight, Check } from "lucide-react-native";
const ChevronsRight = (props: any) => null;
const Check = (props: any) => null;
import { theme } from "../../../theme/theme";

export type SliderVariant = "primary" | "secondary";

export interface SliderProps {
  label?: string;
  onComplete?: () => void;
  containerStyle?: ViewStyle;
  variant?: SliderVariant;
  popupTitle?: string;
  popupDescription?: string;
}

const VARIANT_COLORS = {
  primary: {
    backgroundColor: "#FFF3D1",
    sliderColor: theme.colors.primary,
    completeColor: theme.colors.primary,
    textColor: theme.colors.text,
  },
  secondary: {
    backgroundColor: "#E3F2FD",
    sliderColor: theme.colors.secondary,
    completeColor: theme.colors.secondary,
    textColor: theme.colors.text,
  },
};

export const Slider: React.FC<SliderProps> = ({
  label = "Slide to confirm",
  onComplete,
  containerStyle,
  variant = "primary",
}) => {
  const colors = VARIANT_COLORS[variant];

  const SLIDER_HEIGHT = 70;
  const BUTTON_SIZE = 60;
  const FIXED_WIDTH = 280;
  const [sliderWidth, setSliderWidth] = React.useState(FIXED_WIDTH);

  const pan = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const panResponder = React.useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
          const slideDistance = sliderWidth - BUTTON_SIZE - 8;
          // Clamp the value instead of preventing setValue
          const clampedValue = Math.max(
            0,
            Math.min(gestureState.dx, slideDistance)
          );
          pan.setValue(clampedValue);
          const newOpacity = 1 - clampedValue / slideDistance;
          opacity.setValue(newOpacity);
        },
        onPanResponderRelease: (_, gestureState) => {
          const slideDistance = sliderWidth - BUTTON_SIZE - 8;
          const clampedValue = Math.max(
            0,
            Math.min(gestureState.dx, slideDistance)
          );

          if (clampedValue >= slideDistance * 0.9) {
            Animated.timing(pan, {
              toValue: slideDistance,
              duration: 100,
              useNativeDriver: false,
            }).start(() => {
              if (onComplete) {
                onComplete();
              }
            });
          } else {
            Animated.parallel([
              Animated.spring(pan, {
                toValue: 0,
                useNativeDriver: false,
                tension: 40,
                friction: 8,
              }),
              Animated.timing(opacity, {
                toValue: 1,
                duration: 200,
                useNativeDriver: false,
              }),
            ]).start();
          }
        },
      }),
    [sliderWidth, pan, opacity, onComplete, BUTTON_SIZE]
  );

  const slideDistance = sliderWidth - BUTTON_SIZE - 8;

  const backgroundInterpolation = pan.interpolate({
    inputRange: [0, slideDistance],
    outputRange: [colors.backgroundColor, colors.completeColor],
  });

  const progress = pan.interpolate({
    inputRange: [0, slideDistance],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });

  return (
    <View
      style={[styles.wrapper, containerStyle]}
      onLayout={(event) => {
        const { width } = event.nativeEvent.layout;
        setSliderWidth(Math.min(width, FIXED_WIDTH));
      }}
    >
      <Animated.View
        style={[
          styles.container,
          {
            backgroundColor: backgroundInterpolation,
            width: sliderWidth,
            height: SLIDER_HEIGHT,
          },
        ]}
      >
        <Animated.Text
          style={[
            styles.label,
            {
              color: colors.textColor,
              opacity: opacity,
            },
          ]}
        >
          {label}
        </Animated.Text>

        <Animated.View
          {...panResponder.panHandlers}
          style={[
            styles.slider,
            {
              backgroundColor: colors.sliderColor,
              width: BUTTON_SIZE,
              height: BUTTON_SIZE,
              transform: [{ translateX: pan }],
            },
          ]}
        >
          <Animated.View style={styles.arrowContainer}>
            <Animated.View
              style={{
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 0, 0],
                }),
                position: "absolute",
              }}
            >
              <ChevronsRight size={28} color={theme.colors.text} />
            </Animated.View>

            <Animated.View
              style={{
                opacity: progress.interpolate({
                  inputRange: [0, 0.5, 0.9, 1],
                  outputRange: [0, 1, 0, 0],
                }),
                position: "absolute",
              }}
            >
              <ChevronsRight size={20} color={theme.colors.text} />
            </Animated.View>

            <Animated.View
              style={{
                opacity: progress.interpolate({
                  inputRange: [0, 0.9, 1],
                  outputRange: [0, 0, 1],
                }),
                position: "absolute",
              }}
            >
              <Check size={20} color={theme.colors.text} />
            </Animated.View>
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    alignItems: "center",
  },
  container: {
    borderRadius: theme.radius.pill,
    justifyContent: "center",
    padding: theme.spacing.xs,
    position: "relative",
  },
  label: {
    fontSize: theme.typography.fontSize.medium,
    fontWeight: theme.typography.fontWeight.medium,
    textAlign: "center",
    position: "absolute",
    width: "100%",
    zIndex: 1,
  },
  slider: {
    borderRadius: theme.radius.pill,
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    zIndex: 2,
  },
  arrowContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: 24,
    height: 24,
  },
});
