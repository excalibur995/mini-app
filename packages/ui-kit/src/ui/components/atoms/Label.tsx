// src/atoms/Label.tsx
import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';
import { theme } from '../../../theme/theme';

type LabelProps = {
  children: string; // The text content of the label
  style?: TextStyle; // Optional override styles
  color?:
    | 'primary'
    | 'background'
    | 'text'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'error'
    | 'muted'
    | 'border'
    | 'shadow'
    | 'card'; // Only string colors
  size?: keyof typeof theme.typography.fontSize; // small | medium | large | xlarge
  weight?: keyof typeof theme.typography.fontWeight; // regular | medium | bold
  textAlign?: 'left' | 'center' | 'right' | 'auto' | 'justify'; // ✅ Added
};

export const Label: React.FC<LabelProps> = ({
  children,
  style,
  color = 'text',
  size = 'medium',
  weight = 'regular',
  textAlign = 'left', // ✅ Added with default
}) => {
  return (
    <Text
      style={[
        styles.base,
        {
          color: theme.colors[color],
          fontSize: theme.typography.fontSize[size],
          fontWeight: theme.typography.fontWeight[weight],
          textAlign, // ✅ Added
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  base: {
    fontFamily: theme.typography.fontFamily,
  },
});
