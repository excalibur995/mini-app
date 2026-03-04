// src/atoms/Divider.tsx
import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { theme } from '../../../theme/theme';

type DividerProps = {
  height?: number;
  color?: string;
  style?: ViewStyle;
};

export const Divider: React.FC<DividerProps> = ({
  height = 1,
  color = theme.colors.border,
  style,
}) => {
  return (
    <View
      style={[
        styles.divider,
        {
          height,
          backgroundColor: color,
        },
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    width: '100%',
  },
});
