import SecuritySdk from './NativeSecuritySdk';
import type {
  KeyPair,
  EncryptResult,
  DecryptResult,
  RSADeviceInfo
} from './NativeSecuritySdk';

export type { KeyPair, EncryptResult, DecryptResult, RSADeviceInfo };

export function multiply(a: number, b: number): number {
  return SecuritySdk.multiply(a, b);
}

/**
 * Initialize and generate a new keypair using libsodium
 * @returns Promise with public key (pk) and secret key (sk)
 */
export function initKey(): Promise<KeyPair> {
  return SecuritySdk.initKey();
}

/**
 * Encrypt and authenticate a message using libsodium
 * @param message - The message to encrypt
 * @param serverPublicKey - The server's public key (base64)
 * @param secretKey - Your secret key (base64)
 * @returns Promise with cipher text (ct) and nonce
 */
export function encryptAndAuthenticate(
  message: string,
  serverPublicKey: string,
  secretKey: string
): Promise<EncryptResult> {
  return SecuritySdk.encryptAndAuthenticate(message, serverPublicKey, secretKey);
}

/**
 * Decrypt and verify a message using libsodium
 * @param cipherText - The cipher text to decrypt (base64)
 * @param serverPublicKey - The server's public key (base64)
 * @param serverNonce - The nonce used for encryption (base64)
 * @param mySecretKey - Your secret key (base64)
 * @returns Promise with decrypted plain text
 */
export function decryptAndVerify(
  cipherText: string,
  serverPublicKey: string,
  serverNonce: string,
  mySecretKey: string
): Promise<DecryptResult> {
  return SecuritySdk.decryptAndVerify(
    cipherText,
    serverPublicKey,
    serverNonce,
    mySecretKey
  );
}

// RSA Mobile SDK Methods (Fraud Detection / Device Fingerprinting)

/**
 * Initialize RSA Mobile SDK for device fingerprinting and fraud detection
 * This should be called once when the app starts or before collecting device info
 * @returns Promise<boolean> - true if initialized successfully
 */
export function initRSAMobileSDK(): Promise<boolean> {
  return SecuritySdk.initRSAMobileSDK();
}

/**
 * Fetch device intelligence data from RSA Mobile SDK
 * Must call initRSAMobileSDK() first
 * @returns Promise<RSADeviceInfo> - Device intelligence data including fingerprint
 */
export function fetchRSAMobileSDK(): Promise<RSADeviceInfo> {
  return SecuritySdk.fetchRSAMobileSDK();
}

/**
 * Reinitialize and fetch device intelligence data from RSA Mobile SDK
 * This method destroys any existing instance and creates a new one
 * @returns Promise<RSADeviceInfo> - Device intelligence data including fingerprint
 */
export function getRSAMobileSDK(): Promise<RSADeviceInfo> {
  return SecuritySdk.getRSAMobileSDK();
}
