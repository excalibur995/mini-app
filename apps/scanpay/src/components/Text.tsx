import React from 'react';
import { Text as RNText, TextStyle, StyleSheet } from 'react-native';

interface TextProps {
  text: string;
  fontSize?: number;
  fontWeight?: '400' | '500' | '600' | '700' | 'bold' | 'normal';
  color?: string;
  lineHeight?: number;
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  style?: TextStyle;
  numberOfLines?: number;
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
}

const Text: React.FC<TextProps> = ({
  text,
  fontSize = 14,
  fontWeight = '400',
  color = '#000000',
  lineHeight,
  textAlign = 'left',
  style,
  numberOfLines,
  ellipsizeMode,
}) => {
  const textStyle: TextStyle = {
    fontSize,
    fontWeight,
    color,
    textAlign,
    ...(lineHeight && { lineHeight }),
  };

  return (
    <RNText
      style={[styles.text, textStyle, style]}
      numberOfLines={numberOfLines}
      ellipsizeMode={ellipsizeMode}>
      {text}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'System',
  },
});

export default Text;
