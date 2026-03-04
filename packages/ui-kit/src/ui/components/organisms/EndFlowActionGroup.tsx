import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { EndFlowAction } from "../molecules"; // adjust import path

export type ActionItem = {
  icon: string;
  label: string;
  onPress?: () => void; // optional handler
};

type EndFlowActionGroupProps = {
  data: ActionItem[];
};

export const EndFlowActionGroup: React.FC<EndFlowActionGroupProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      {data.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={item.onPress}
          activeOpacity={0.7}
        >
          <EndFlowAction icon={item.icon} label={item.label} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 16,
  },
});
