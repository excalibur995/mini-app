// src/atoms/Hyperlink.tsx
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, TextStyle, ViewStyle } from 'react-native';

type HyperlinkProps = {
  text: string;
  onPress: () => void;
  underline?: boolean;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  style?: TextStyle;
  containerStyle?: ViewStyle;
  disabled?: boolean;
};

export const Hyperlink: React.FC<HyperlinkProps> = ({
  text,
  onPress,
  underline = true,
  size = 'medium',
  color = '#000000', // Black as primary
  style,
  containerStyle,
  disabled = false,
}) => {
  const fontSize = {
    small: 12,
    medium: 14,
    large: 16,
  }[size];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.6}
      style={[styles.container, containerStyle]}
    >
      <Text
        style={[
          styles.text,
          {
            fontSize,
            color: disabled ? '#999999' : color,
            textDecorationLine: underline ? 'underline' : 'none',
          },
          style,
        ]}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
  },
  text: {
    fontWeight: '400',
  },
});
