import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { Icon, Label } from "../atoms"; // adjust import path
import { theme } from "../../../theme/theme";

type EndFlowActionProps = {
  icon: string;        // name of the icon from your Icon atom
  label: string;       // action name
  onPress?: () => void; // optional press handler
};

export const EndFlowAction: React.FC<EndFlowActionProps> = ({ icon, label, onPress }) => {
  const content = (
    <View style={styles.container}>
      <Icon icon={icon} size={36} color={theme.colors.muted} />
      <Label size="small" weight="bold" style={styles.label} color="muted">
        {label}
      </Label>
    </View>
  );

  return onPress ? (
    <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
      {content}
    </TouchableOpacity>
  ) : (
    content
  );
};

const styles = StyleSheet.create({
  container: {
    width: 80,                  // fixed width
    height: 80,                // fixed height to allow spacing
    justifyContent: "space-between", // space between icon and label
    alignItems: "center",
  },
  label: {
    textAlign: "center",        // center text, allow wrapping
  },
});
