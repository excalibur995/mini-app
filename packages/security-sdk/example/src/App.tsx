import { useState, useEffect } from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Button,
  ActivityIndicator,
} from 'react-native';
import {
  multiply,
  initKey,
  encryptAndAuthenticate,
  decryptAndVerify,
  initRSAMobileSDK,
  fetchRSAMobileSDK,
  getRSAMobileSDK,
  type KeyPair,
  type RSADeviceInfo,
} from 'security-sdk';

export default function App() {
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [clientKeyPair, setClientKeyPair] = useState<KeyPair | null>(null);
  const [serverKeyPair, setServerKeyPair] = useState<KeyPair | null>(null);
  const [rsaInitialized, setRsaInitialized] = useState(false);

  const addLog = (message: string) => {
    setLogs((prev) => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testMultiply = () => {
    const result = multiply(3, 7);
    addLog(`Multiply test: 3 × 7 = ${result}`);
  };

  const testInitKey = async () => {
    setLoading(true);
    try {
      addLog('Generating client keypair...');
      const clientKeys = await initKey();
      setClientKeyPair(clientKeys);
      addLog(`Client Public Key: ${clientKeys.pk.substring(0, 20)}...`);

      addLog('Generating server keypair...');
      const serverKeys = await initKey();
      setServerKeyPair(serverKeys);
      addLog(`Server Public Key: ${serverKeys.pk.substring(0, 20)}...`);
    } catch (error) {
      addLog(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testEncryption = async () => {
    if (!clientKeyPair || !serverKeyPair) {
      addLog('Please generate keys first!');
      return;
    }

    setLoading(true);
    try {
      const message = 'Hello, this is a secret message!';
      addLog(`Encrypting message: "${message}"`);

      const encrypted = await encryptAndAuthenticate(
        message,
        serverKeyPair.pk,
        clientKeyPair.sk
      );

      addLog(`Encrypted successfully!`);
      addLog(`Cipher text: ${encrypted.ct.substring(0, 30)}...`);
      addLog(`Nonce: ${encrypted.nonce.substring(0, 20)}...`);

      // Now decrypt it
      addLog('Decrypting message...');
      const decrypted = await decryptAndVerify(
        encrypted.ct,
        clientKeyPair.pk,
        encrypted.nonce,
        serverKeyPair.sk
      );

      addLog(`Decrypted: "${decrypted.plainText}"`);

      if (decrypted.plainText === message) {
        addLog('✓ Encryption/Decryption test PASSED!');
      } else {
        addLog('✗ Encryption/Decryption test FAILED!');
      }
    } catch (error) {
      addLog(`Error: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // RSA Mobile SDK Tests (Fraud Detection / Device Fingerprinting)

  const testInitRSA = async () => {
    setLoading(true);
    try {
      addLog('Initializing RSA Mobile SDK...');
      const initialized = await initRSAMobileSDK();
      setRsaInitialized(initialized);
      if (initialized) {
        addLog('✓ RSA Mobile SDK initialized successfully!');
      } else {
        addLog('✗ RSA Mobile SDK initialization failed');
      }
    } catch (error) {
      addLog(`Error initializing RSA: ${error}`);
      setRsaInitialized(false);
    } finally {
      setLoading(false);
    }
  };

  const testFetchRSA = async () => {
    if (!rsaInitialized) {
      addLog('Please initialize RSA Mobile SDK first!');
      return;
    }

    setLoading(true);
    try {
      addLog('Fetching device fingerprint...');
      const deviceInfo: RSADeviceInfo = await fetchRSAMobileSDK();

      addLog(`Success: ${deviceInfo.success}`);

      // Parse and display the result
      try {
        const data = JSON.parse(deviceInfo.result);
        addLog(`Device data collected (${Object.keys(data).length} fields)`);
        addLog(`Sample data: ${JSON.stringify(data).substring(0, 100)}...`);
      } catch (e) {
        addLog(`Device fingerprint: ${deviceInfo.result.substring(0, 100)}...`);
      }

      addLog('✓ Device fingerprint fetched successfully!');
    } catch (error) {
      addLog(`Error fetching RSA data: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const testGetRSA = async () => {
    setLoading(true);
    try {
      addLog('Reinitializing and fetching device fingerprint...');
      const deviceInfo: RSADeviceInfo = await getRSAMobileSDK();

      addLog(`Success: ${deviceInfo.success}`);

      // Parse and display the result
      try {
        const data = JSON.parse(deviceInfo.result);
        addLog(`Device data collected (${Object.keys(data).length} fields)`);
        addLog(`Sample data: ${JSON.stringify(data).substring(0, 100)}...`);
      } catch (e) {
        addLog(`Device fingerprint: ${deviceInfo.result.substring(0, 100)}...`);
      }

      setRsaInitialized(true);
      addLog('✓ Device fingerprint fetched successfully!');
    } catch (error) {
      addLog(`Error getting RSA data: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const clearLogs = () => {
    setLogs([]);
    setClientKeyPair(null);
    setServerKeyPair(null);
    setRsaInitialized(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Security SDK Test</Text>

      <View style={styles.buttonContainer}>
        <Text style={styles.sectionTitle}>Libsodium Encryption</Text>
        <Button title="Test Multiply" onPress={testMultiply} />
        <Button title="Generate Keys" onPress={testInitKey} />
        <Button
          title="Test Encryption"
          onPress={testEncryption}
          disabled={!clientKeyPair || !serverKeyPair}
        />

        <Text style={styles.sectionTitle}>RSA Mobile SDK (Fraud Detection)</Text>
        <Button title="Init RSA SDK" onPress={testInitRSA} />
        <Button
          title="Fetch Device Fingerprint"
          onPress={testFetchRSA}
          disabled={!rsaInitialized}
        />
        <Button title="Get RSA Data (Reinit)" onPress={testGetRSA} />

        <Button title="Clear Logs" onPress={clearLogs} color="red" />
      </View>

      {loading && <ActivityIndicator size="large" color="#0000ff" />}

      <ScrollView style={styles.logsContainer}>
        {logs.map((log, index) => (
          <Text key={index} style={styles.logText}>
            {log}
          </Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  buttonContainer: {
    gap: 10,
    marginBottom: 20,
  },
  logsContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 5,
  },
  logText: {
    fontSize: 12,
    fontFamily: 'monospace',
    marginBottom: 5,
  },
});
