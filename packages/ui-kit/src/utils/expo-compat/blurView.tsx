import React from "react";

let BlurView: any;

try {
  const ExpoBlur = require("expo-blur");
  BlurView = ExpoBlur.BlurView || ExpoBlur.default || ExpoBlur;
} catch {
  try {
    const RNBlur = require("@react-native-community/blur");
    BlurView = RNBlur.BlurView || RNBlur.default || RNBlur;
  } catch (error) {
    throw new Error(
      "Neither expo-blur nor @react-native-community/blur is installed. " +
        "Please install one of them: yarn add expo-blur OR yarn add @react-native-community/blur"
    );
  }
}

export const CompatibleBlurView = (props: any) => {
  return React.createElement(BlurView, { ...props });
};

export default CompatibleBlurView;
