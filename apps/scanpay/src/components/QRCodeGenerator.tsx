import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

export interface QRCodeGeneratorProps {
  value: string;
  size?: number;
  backgroundColor?: string;
  color?: string;
  logo?: any;
  logoSize?: number;
  logoBackgroundColor?: string;
  logoMargin?: number;
  logoBorderRadius?: number;
  quietZone?: number;
  enableLinearGradient?: boolean;
  gradientDirection?: number[];
  linearGradient?: [string, string];
  ecl?: 'L' | 'M' | 'Q' | 'H';
  getRef?: (ref: any) => void;
  onError?: (error: any) => void;
  containerStyle?: ViewStyle;
}

/**
 * QRCodeGenerator Component
 *
 * A flexible QR code generator component using react-native-qrcode-svg.
 * Supports customization options like size, colors, logo, and error correction level.
 *
 * Features:
 * - Generate QR codes from any string value
 * - Customizable size and colors
 * - Optional logo in center
 * - Error correction levels (L, M, Q, H)
 * - Linear gradient support
 * - Get reference for saving as image
 *
 * @example
 * ```tsx
 * <QRCodeGenerator
 *   value="https://example.com"
 *   size={200}
 *   color="#000"
 *   backgroundColor="#fff"
 *   logo={require('./logo.png')}
 *   ecl="H"
 * />
 * ```
 */
const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
  value,
  size = 200,
  backgroundColor = 'white',
  color = 'black',
  logo,
  logoSize = 50,
  logoBackgroundColor = 'transparent',
  logoMargin = 2,
  logoBorderRadius = 0,
  quietZone = 0,
  enableLinearGradient = false,
  gradientDirection = [170, 0, 0, 0],
  linearGradient = ['rgb(255,0,0)', 'rgb(0,255,255)'],
  ecl = 'M',
  getRef,
  onError,
  containerStyle,
}) => {
  if (!value) {
    return null;
  }

  return (
    <View style={[styles.container, containerStyle]}>
      <QRCode
        value={value}
        size={size}
        color={color}
        backgroundColor={backgroundColor}
        logo={logo}
        logoSize={logoSize}
        logoBackgroundColor={logoBackgroundColor}
        logoMargin={logoMargin}
        logoBorderRadius={logoBorderRadius}
        quietZone={quietZone}
        enableLinearGradient={enableLinearGradient}
        gradientDirection={gradientDirection}
        linearGradient={linearGradient}
        ecl={ecl}
        getRef={getRef}
        onError={onError}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default QRCodeGenerator;
