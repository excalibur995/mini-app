package com.securitysdk;

import android.util.Base64;
import android.util.Log;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.module.annotations.ReactModule;

import com.goterl.lazysodium.LazySodiumAndroid;
import com.goterl.lazysodium.SodiumAndroid;
import com.goterl.lazysodium.interfaces.Box;
import com.goterl.lazysodium.utils.KeyPair;

import com.rsa.mobilesdk.sdk.MobileAPI;

import org.json.JSONObject;

import java.util.Properties;

@ReactModule(name = SecuritySdkModule.NAME)
public class SecuritySdkModule extends NativeSecuritySdkSpec {
    public static final String NAME = "SecuritySdk";
    private static final String TAG = "SecuritySdk";
    private final ReactApplicationContext reactContext;
    private final LazySodiumAndroid lazySodium;
    private MobileAPI mobileAPI;

    public SecuritySdkModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        this.lazySodium = new LazySodiumAndroid(new SodiumAndroid());
        this.mobileAPI = null;
        Log.d(TAG, "LazySodium initialized successfully");
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    // Example method
    @Override
    public double multiply(double a, double b) {
        return a * b;
    }

    @Override
    public void initKey(Promise promise) {
        try {
            KeyPair keyPair = lazySodium.cryptoBoxKeypair();

            WritableMap resultMap = new WritableNativeMap();
            resultMap.putString("pk", Base64.encodeToString(keyPair.getPublicKey().getAsBytes(), Base64.NO_WRAP));
            resultMap.putString("sk", Base64.encodeToString(keyPair.getSecretKey().getAsBytes(), Base64.NO_WRAP));

            promise.resolve(resultMap);
        } catch (Exception e) {
            promise.reject("INIT_KEY_ERROR", "Failed to initialize key: " + e.getMessage(), e);
        }
    }

    @Override
    public void encryptAndAuthenticate(String message, String serverPublicKey, String secretKey, Promise promise) {
        try {
            byte[] messageBytes = message.getBytes("UTF-8");
            byte[] serverPkBytes = Base64.decode(serverPublicKey, Base64.NO_WRAP);
            byte[] secretKeyBytes = Base64.decode(secretKey, Base64.NO_WRAP);
            byte[] nonce = lazySodium.nonce(Box.NONCEBYTES);

            // Allocate buffer for ciphertext (message length + MAC length)
            byte[] cipherBytes = new byte[Box.MACBYTES + messageBytes.length];

            // Use cryptoBoxEasy from Box interface
            boolean success = lazySodium.cryptoBoxEasy(
                cipherBytes,
                messageBytes,
                messageBytes.length,
                nonce,
                serverPkBytes,
                secretKeyBytes
            );

            if (!success) {
                promise.reject("ENCRYPT_ERROR", "Encryption failed");
                return;
            }

            WritableMap resultMap = new WritableNativeMap();
            resultMap.putString("ct", Base64.encodeToString(cipherBytes, Base64.NO_WRAP));
            resultMap.putString("nonce", Base64.encodeToString(nonce, Base64.NO_WRAP));

            promise.resolve(resultMap);
        } catch (Exception e) {
            promise.reject("ENCRYPT_ERROR", "Failed to encrypt: " + e.getMessage(), e);
        }
    }

    @Override
    public void decryptAndVerify(String cipherText, String serverPublicKey, String serverNonce, String mySecretKey, Promise promise) {
        try {
            byte[] cipherBytes = Base64.decode(cipherText, Base64.NO_WRAP);
            byte[] serverPkBytes = Base64.decode(serverPublicKey, Base64.NO_WRAP);
            byte[] nonceBytes = Base64.decode(serverNonce, Base64.NO_WRAP);
            byte[] secretKeyBytes = Base64.decode(mySecretKey, Base64.NO_WRAP);

            // Allocate buffer for plaintext (ciphertext length - MAC length)
            byte[] plainBytes = new byte[cipherBytes.length - Box.MACBYTES];

            // Use cryptoBoxOpenEasy from Box interface
            boolean success = lazySodium.cryptoBoxOpenEasy(
                plainBytes,
                cipherBytes,
                cipherBytes.length,
                nonceBytes,
                serverPkBytes,
                secretKeyBytes
            );

            if (!success) {
                promise.reject("DECRYPT_ERROR", "Decryption failed");
                return;
            }

            String plainText = new String(plainBytes, "UTF-8");

            WritableMap resultMap = new WritableNativeMap();
            resultMap.putString("plainText", plainText);

            promise.resolve(resultMap);
        } catch (Exception e) {
            promise.reject("DECRYPT_ERROR", "Failed to decrypt: " + e.getMessage(), e);
        }
    }

    // RSA Mobile SDK Methods (Fraud Detection / Device Fingerprinting)

    @Override
    public void initRSAMobileSDK(Promise promise) {
        try {
            mobileAPI = MobileAPI.getInstance(reactContext);
            Properties properties = new Properties();
            properties.setProperty("Configuration-key", "2");
            properties.setProperty(mobileAPI.ENABLE_PHONE_CALL, "1");
            properties.setProperty(mobileAPI.ENABLE_BIOMETRIC, "1");
            mobileAPI.initSDK(properties);
            Log.d(TAG, "RSA Mobile SDK initialized successfully");
            promise.resolve(true);
        } catch (Exception e) {
            Log.e(TAG, "Failed to initialize RSA Mobile SDK: " + e.getMessage(), e);
            promise.reject("RSA_INIT_ERROR", "Failed to initialize RSA Mobile SDK: " + e.getMessage(), e);
        }
    }

    @Override
    public void fetchRSAMobileSDK(Promise promise) {
        try {
            if (mobileAPI == null) {
                promise.reject("RSA_NOT_INITIALIZED", "RSA Mobile SDK not initialized. Call initRSAMobileSDK first.");
                return;
            }
            String deviceInfoStr = mobileAPI.collectInfo();
            WritableMap resultMap = new WritableNativeMap();
            resultMap.putString("success", "true");
            resultMap.putString("result", deviceInfoStr);
            Log.d(TAG, "RSA Mobile SDK device info collected");
            promise.resolve(resultMap);
        } catch (Exception e) {
            Log.e(TAG, "Failed to fetch RSA Mobile SDK data: " + e.getMessage(), e);
            promise.reject("RSA_FETCH_ERROR", "Failed to fetch RSA Mobile SDK data: " + e.getMessage(), e);
        }
    }

    @Override
    public void getRSAMobileSDK(Promise promise) {
        try {
            // Get fresh instance and reinitialize (like original implementation)
            mobileAPI = MobileAPI.getInstance(reactContext);
            mobileAPI.destroy();

            Properties properties = new Properties();
            properties.setProperty("Configuration-key", "2");
            properties.setProperty(mobileAPI.ENABLE_PHONE_CALL, "1");
            properties.setProperty(mobileAPI.ENABLE_BIOMETRIC, "1");
            mobileAPI.initSDK(properties);

            String deviceInfoStr = mobileAPI.collectInfo();
            WritableMap resultMap = new WritableNativeMap();
            resultMap.putString("success", "true");
            resultMap.putString("result", deviceInfoStr);
            Log.d(TAG, "RSA Mobile SDK reinitialized and device info collected");
            promise.resolve(resultMap);
        } catch (Exception e) {
            Log.e(TAG, "Failed to get RSA Mobile SDK data: " + e.getMessage(), e);
            promise.reject("RSA_GET_ERROR", "Failed to get RSA Mobile SDK data: " + e.getMessage(), e);
        }
    }
}
