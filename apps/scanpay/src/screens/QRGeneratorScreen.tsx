import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import QRCodeGenerator from '../components/QRCodeGenerator';
import Text from '../components/Text';
import { ROYAL_BLUE, WHITE } from '../constants/Colors';

/**
 * QR Generator Screen
 *
 * Screen for generating QR codes with customizable options.
 * Users can input data and generate QR codes with various settings.
 */
const QRGeneratorScreen: React.FC = () => {
  const [qrValue, setQrValue] = useState('https://example.com');
  const [qrSize, setQrSize] = useState('250');
  const [selectedECL, setSelectedECL] = useState<'L' | 'M' | 'Q' | 'H'>('M');
  const qrRef = useRef<any>(null);

  const handleGeneratePaymentQR = () => {
    const paymentData = {
      merchantId: '1234567890',
      amount: '50.00',
      currency: 'MYR',
      reference: `INV-${Date.now()}`,
      timestamp: new Date().toISOString(),
    };
    setQrValue(JSON.stringify(paymentData));
  };

  const handleSaveQR = () => {
    if (qrRef.current) {
      qrRef.current.toDataURL((dataURL: string) => {
        Alert.alert(
          'QR Code Generated',
          'QR code data URL is ready. You can implement save/share functionality here.',
          [
            {
              text: 'OK',
              onPress: () => console.log('QR Code Data URL:', dataURL),
            },
          ]
        );
      });
    }
  };

  const eclLevels: Array<'L' | 'M' | 'Q' | 'H'> = ['L', 'M', 'Q', 'H'];

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        {/* QR Code Display */}
        <View style={styles.qrContainer}>
          <QRCodeGenerator
            value={qrValue || 'https://example.com'}
            size={parseInt(qrSize) || 250}
            ecl={selectedECL}
            backgroundColor="white"
            color="black"
            getRef={(ref) => (qrRef.current = ref)}
          />
        </View>

        {/* Input Section */}
        <View style={styles.inputSection}>
          <Text text="QR Code Data" fontSize={16} fontWeight="600" />
          <TextInput
            style={styles.input}
            value={qrValue}
            onChangeText={setQrValue}
            placeholder="Enter data for QR code"
            multiline
            numberOfLines={3}
          />
        </View>

        {/* Size Input */}
        <View style={styles.inputSection}>
          <Text text="QR Code Size" fontSize={16} fontWeight="600" />
          <TextInput
            style={styles.input}
            value={qrSize}
            onChangeText={setQrSize}
            placeholder="Enter size (e.g., 250)"
            keyboardType="numeric"
          />
        </View>

        {/* Error Correction Level */}
        <View style={styles.inputSection}>
          <Text
            text="Error Correction Level"
            fontSize={16}
            fontWeight="600"
          />
          <View style={styles.eclContainer}>
            {eclLevels.map((level) => (
              <TouchableOpacity
                key={level}
                style={[
                  styles.eclButton,
                  selectedECL === level && styles.eclButtonSelected,
                ]}
                onPress={() => setSelectedECL(level)}
              >
                <Text
                  text={level}
                  fontSize={14}
                  fontWeight="600"
                  color={selectedECL === level ? WHITE : '#000'}
                />
              </TouchableOpacity>
            ))}
          </View>
          <Text
            text={`${
              selectedECL === 'L'
                ? 'Low (~7%)'
                : selectedECL === 'M'
                ? 'Medium (~15%)'
                : selectedECL === 'Q'
                ? 'Quartile (~25%)'
                : 'High (~30%)'
            }`}
            fontSize={12}
            fontWeight="400"
            color="#6E7375"
          />
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={handleGeneratePaymentQR}
          >
            <Text
              text="Generate Payment QR"
              fontSize={16}
              fontWeight="600"
              color={WHITE}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.secondaryButton]}
            onPress={handleSaveQR}
          >
            <Text
              text="Save QR Code"
              fontSize={16}
              fontWeight="600"
              color={ROYAL_BLUE}
            />
          </TouchableOpacity>
        </View>

        {/* Quick Presets */}
        <View style={styles.inputSection}>
          <Text text="Quick Presets" fontSize={16} fontWeight="600" />
          <View style={styles.presetContainer}>
            <TouchableOpacity
              style={styles.presetButton}
              onPress={() => setQrValue('https://example.com')}
            >
              <Text text="Website URL" fontSize={12} fontWeight="500" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.presetButton}
              onPress={() => setQrValue('mailto:example@email.com')}
            >
              <Text text="Email" fontSize={12} fontWeight="500" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.presetButton}
              onPress={() => setQrValue('tel:+60123456789')}
            >
              <Text text="Phone" fontSize={12} fontWeight="500" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
  content: {
    padding: 20,
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
    padding: 30,
    borderRadius: 12,
    marginBottom: 24,
  },
  inputSection: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Poppins',
    backgroundColor: WHITE,
  },
  eclContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
    marginBottom: 4,
  },
  eclButton: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    backgroundColor: WHITE,
  },
  eclButtonSelected: {
    backgroundColor: ROYAL_BLUE,
    borderColor: ROYAL_BLUE,
  },
  buttonContainer: {
    gap: 12,
    marginTop: 8,
    marginBottom: 20,
  },
  button: {
    backgroundColor: ROYAL_BLUE,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: ROYAL_BLUE,
  },
  presetContainer: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  presetButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default QRGeneratorScreen;
