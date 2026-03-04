import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleSheet,
  View,
} from 'react-native';

type LogoProps = {
  // Use 'source' to pass your require('./path-to-image.png')
  source: ImageSourcePropType;

  // Optional: Allow resizing (Default: 50)
  width?: number;
  height?: number;

  // Optional: Resize mode (cover, contain, etc.)
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';

  // Optional: Override styles
  style?: ImageStyle;
};

export const Logo: React.FC<LogoProps> = ({
  source,
  width = 50,
  height = 50,
  resizeMode = 'contain',
  style,
}) => {
  return (
    <Image
      source={source}
      resizeMode={resizeMode}
      style={[
        styles.base,
        { width, height }, // apply props
        style,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  base: {
    // Basic defaults if needed
  },
});
