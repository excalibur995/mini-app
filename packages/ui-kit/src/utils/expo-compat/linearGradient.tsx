import React from "react";

let LinearGradient: any;

try {
  const ExpoLinearGradient = require("expo-linear-gradient");
  LinearGradient =
    ExpoLinearGradient.LinearGradient ||
    ExpoLinearGradient.default ||
    ExpoLinearGradient;
} catch {
  try {
    LinearGradient =
      require("react-native-linear-gradient").default ||
      require("react-native-linear-gradient");
  } catch (error) {
    throw new Error(
      "Neither expo-linear-gradient nor react-native-linear-gradient is installed. " +
        "Please install one of them: yarn add expo-linear-gradient OR yarn add react-native-linear-gradient"
    );
  }
}

export const CompatibleLinearGradient = (props: any) => {
  return React.createElement(LinearGradient, { ...props });
};

export default CompatibleLinearGradient;
