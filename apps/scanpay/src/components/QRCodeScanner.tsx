import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
  Code,
} from 'react-native-vision-camera';
import { useIsFocused } from '@react-navigation/native';

import Text from './Text';
import { WHITE } from '../constants/Colors';

const { width } = Dimensions.get('window');

export interface QRCodeScannerProps {
  onScan: (value: string) => void;
  onError?: (error: string) => void;
  enableTorch?: boolean;
  scannerTitle?: string;
  scannerSubtitle?: string;
  containerStyle?: ViewStyle;
  cooldownMs?: number;
  paused?: boolean;
}

/**
 * QRCodeScanner Component
 *
 * A simple, focused QR code scanner component using react-native-vision-camera.
 * Similar to QRCodeGenerator in simplicity and reusability.
 *
 * Features:
 * - Clean QR code scanning with camera
 * - Torch/flashlight control
 * - Permission handling
 * - Customizable UI
 * - Cooldown period between scans
 * - Pause/resume scanning
 *
 * @example
 * ```tsx
 * <QRCodeScanner
 *   onScan={(value) => console.log('Scanned:', value)}
 *   onError={(error) => console.log('Error:', error)}
 *   scannerTitle="Scan QR Code"
 *   enableTorch
 * />
 * ```
 */
const QRCodeScanner: React.FC<QRCodeScannerProps> = ({
  onScan,
  onError,
  enableTorch = true,
  scannerTitle = 'Place QR code in the scan area',
  scannerSubtitle,
  containerStyle,
  cooldownMs = 2000,
  paused = false,
}) => {
  const isFocused = useIsFocused();
  const [torchOn, setTorchOn] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const { hasPermission, requestPermission } = useCameraPermission();
  const device = useCameraDevice('back');

  // Handle screen focus, permissions, and pause
  useEffect(() => {
    if (!hasPermission) {
      requestPermission().catch((err) => {
        onError?.(err?.message || 'Failed to request camera permission');
      });
      return;
    }

    if (isFocused && !paused) {
      setIsActive(true);
    } else {
      setIsActive(false);
      setTorchOn(false);
    }
  }, [isFocused, hasPermission, paused, requestPermission, onError]);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: useCallback(
      (codes: Code[]) => {
        if (!isActive || isProcessing || !codes[0]?.value) return;

        setIsActive(false);
        setIsProcessing(true);
        onScan(codes[0].value);

        setTimeout(() => {
          setIsProcessing(false);
          if (isFocused && !paused) setIsActive(true);
        }, cooldownMs);
      },
      [isActive, isProcessing, onScan, cooldownMs, isFocused, paused]
    ),
  });

  const toggleTorch = useCallback(() => setTorchOn((prev) => !prev), []);

  if (!hasPermission) {
    return (
      <View style={[styles.container, styles.permissionContainer, containerStyle]}>
        <Text text="📷" fontSize={48} fontWeight="400" />
        <Text
          text="Camera Permission Required"
          fontSize={18}
          fontWeight="600"
          color="#000"
        />
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text text="Grant Permission" fontSize={16} fontWeight="600" color={WHITE} />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, containerStyle]}>
      {device && (
        <Camera
          codeScanner={codeScanner}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={isActive}
          torch={torchOn ? 'on' : 'off'}
        />
      )}

      <View style={styles.overlay}>
        <View style={styles.scanFrame}>
          <View style={[styles.corner, { top: 0, left: 0, borderTopWidth: 4, borderLeftWidth: 4 }]} />
          <View style={[styles.corner, { top: 0, right: 0, borderTopWidth: 4, borderRightWidth: 4 }]} />
          <View style={[styles.corner, { bottom: 0, left: 0, borderBottomWidth: 4, borderLeftWidth: 4 }]} />
          <View style={[styles.corner, { bottom: 0, right: 0, borderBottomWidth: 4, borderRightWidth: 4 }]} />
        </View>

        <View style={styles.textContainer}>
          <Text text={scannerTitle} fontSize={16} fontWeight="400" color={WHITE} />
          {scannerSubtitle && (
            <Text text={scannerSubtitle} fontSize={14} fontWeight="400" color={WHITE} />
          )}
        </View>
      </View>

      {enableTorch && device && (
        <TouchableOpacity
          style={[styles.torchButton, torchOn && styles.torchActive]}
          onPress={toggleTorch}
        >
          <Text text={torchOn ? '🔦' : '💡'} fontSize={24} fontWeight="400" />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  permissionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    backgroundColor: WHITE,
  },
  permissionButton: {
    backgroundColor: '#003366',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  overlay: {
    position: 'absolute',
    top: '15%',
    alignSelf: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: width * 0.7,
    height: width * 0.7,
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: WHITE,
  },
  textContainer: {
    marginTop: 24,
    alignItems: 'center',
    gap: 8,
  },
  torchButton: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  torchActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
});

export default QRCodeScanner;
