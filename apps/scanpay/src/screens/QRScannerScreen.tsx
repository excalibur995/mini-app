import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import QRCodeScanner from '../components/QRCodeScanner';
import Text from '../components/Text';
import { WHITE } from '../constants/Colors';

/**
 * QR Scanner Screen
 *
 * Screen wrapper for the simplified QR Scanner component.
 * Displays scanned QR code values.
 */
const QRScannerScreen: React.FC = () => {
  const [scannedValue, setScannedValue] = useState<string>('');
  const [scanCount, setScanCount] = useState(0);

  const handleScan = (value: string) => {
    setScannedValue(value);
    setScanCount((prev) => prev + 1);

    // Show alert with scanned value
    Alert.alert(
      'QR Code Scanned',
      value,
      [
        {
          text: 'OK',
          onPress: () => console.log('Scanned:', value),
        },
      ],
      { cancelable: true }
    );
  };

  const handleError = (error: string) => {
    Alert.alert('Scanner Error', error);
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onScan={handleScan}
        onError={handleError}
        scannerTitle="Place QR code in the scan area"
        scannerSubtitle="The camera will scan automatically"
        enableTorch
      />

      {/* Display last scanned value */}
      {scannedValue && (
        <View style={styles.resultContainer}>
          <Text
            text={`Scanned ${scanCount} time${scanCount > 1 ? 's' : ''}`}
            fontSize={12}
            fontWeight="600"
            color={WHITE}
          />
          <Text
            text="Last scanned:"
            fontSize={14}
            fontWeight="400"
            color={WHITE}
          />
          <Text
            text={scannedValue}
            fontSize={12}
            fontWeight="400"
            color={WHITE}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  resultContainer: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 16,
    borderRadius: 8,
    gap: 4,
  },
});

export default QRScannerScreen;
