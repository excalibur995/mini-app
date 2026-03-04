import { TurboModuleRegistry, type TurboModule } from 'react-native';

export interface KeyPair {
  pk: string;
  sk: string;
}

export interface EncryptResult {
  ct: string;
  nonce: string;
}

export interface DecryptResult {
  plainText: string;
}

export interface RSADeviceInfo {
  success: string;
  result: string;
}

export interface Spec extends TurboModule {
  multiply(a: number, b: number): number;

  // Libsodium methods
  initKey(): Promise<KeyPair>;
  encryptAndAuthenticate(
    message: string,
    serverPublicKey: string,
    secretKey: string
  ): Promise<EncryptResult>;
  decryptAndVerify(
    cipherText: string,
    serverPublicKey: string,
    serverNonce: string,
    mySecretKey: string
  ): Promise<DecryptResult>;

  // RSA Mobile SDK methods (Fraud Detection / Device Fingerprinting)
  initRSAMobileSDK(): Promise<boolean>;
  fetchRSAMobileSDK(): Promise<RSADeviceInfo>;
  getRSAMobileSDK(): Promise<RSADeviceInfo>;
}

export default TurboModuleRegistry.getEnforcing<Spec>('SecuritySdk');
