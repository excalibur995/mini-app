#import "SecuritySdk.h"
#import "SodiumObjc.h"
#import "sodium.h"
#import "MobileAPI.h"

@implementation SecuritySdk {
    MobileAPI *mMobileAPI;
}

- (NSNumber *)multiply:(double)a b:(double)b {
    NSNumber *result = @(a * b);
    return result;
}

- (void)initKey:(RCTPromiseResolveBlock)resolve
         reject:(RCTPromiseRejectBlock)reject {
    @try {
        NACLAsymmetricKeyPair *keyPair = [NACLAsymmetricKeyPair keyPair];

        NSDictionary *result = @{
            @"pk": [keyPair.publicKey.data base64EncodedStringWithOptions:0],
            @"sk": [keyPair.privateKey.data base64EncodedStringWithOptions:0]
        };

        resolve(result);
    } @catch (NSException *exception) {
        reject(@"INIT_KEY_ERROR", @"Failed to initialize key", nil);
    }
}

- (void)encryptAndAuthenticate:(NSString *)message
                serverPublicKey:(NSString *)serverPublicKey
                     secretKey:(NSString *)secretKey
                       resolve:(RCTPromiseResolveBlock)resolve
                        reject:(RCTPromiseRejectBlock)reject {
    @try {
        // Remove any escape characters from the message
        NSString *cleanMessage = [message stringByReplacingOccurrencesOfString:@"\\" withString:@""];

        // Convert base64 strings to NSData
        NSData *serverPkData = [[NSData alloc] initWithBase64EncodedString:serverPublicKey options:0];
        NSData *secretKeyData = [[NSData alloc] initWithBase64EncodedString:secretKey options:0];

        // Create keys from data
        NACLNonce *nonce = [NACLNonce nonce];
        NACLAsymmetricPublicKey *serverKey = [[NACLAsymmetricPublicKey alloc] initWithData:serverPkData];
        NACLAsymmetricPrivateKey *mySecretKey = [[NACLAsymmetricPrivateKey alloc] initWithData:secretKeyData];

        // Encrypt the message
        NSData *encryptedData = [cleanMessage encryptedDataUsingPublicKey:serverKey
                                                           privateKey:mySecretKey
                                                                nonce:nonce];

        if (encryptedData == nil) {
            reject(@"ENCRYPT_ERROR", @"Encryption failed", nil);
            return;
        }

        NSDictionary *result = @{
            @"ct": [encryptedData base64EncodedStringWithOptions:0],
            @"nonce": [nonce.data base64EncodedStringWithOptions:0]
        };

        resolve(result);
    } @catch (NSException *exception) {
        reject(@"ENCRYPT_ERROR", [NSString stringWithFormat:@"Failed to encrypt: %@", exception.reason], nil);
    }
}

- (void)decryptAndVerify:(NSString *)cipherText
         serverPublicKey:(NSString *)serverPublicKey
             serverNonce:(NSString *)serverNonce
            mySecretKey:(NSString *)mySecretKey
                 resolve:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject {
    @try {
        // Convert base64 strings to NSData
        NSData *cipherData = [[NSData alloc] initWithBase64EncodedString:cipherText options:0];
        NSData *serverPkData = [[NSData alloc] initWithBase64EncodedString:serverPublicKey options:0];
        NSData *nonceData = [[NSData alloc] initWithBase64EncodedString:serverNonce options:0];
        NSData *secretKeyData = [[NSData alloc] initWithBase64EncodedString:mySecretKey options:0];

        // Create keys and nonce from data
        NACLNonce *nonce = [NACLNonce nonceWithData:nonceData];
        NACLAsymmetricPublicKey *serverKey = [[NACLAsymmetricPublicKey alloc] initWithData:serverPkData];
        NACLAsymmetricPrivateKey *myKey = [[NACLAsymmetricPrivateKey alloc] initWithData:secretKeyData];

        // Decrypt the message
        NSString *plainText = [cipherData decryptedTextUsingPublicKey:serverKey
                                                        privateKey:myKey
                                                             nonce:&nonce];

        if (plainText == nil) {
            reject(@"DECRYPT_ERROR", @"Decryption failed", nil);
            return;
        }

        NSDictionary *result = @{
            @"plainText": plainText
        };

        resolve(result);
    } @catch (NSException *exception) {
        reject(@"DECRYPT_ERROR", [NSString stringWithFormat:@"Failed to decrypt: %@", exception.reason], nil);
    }
}

// RSA Mobile SDK Methods (Fraud Detection / Device Fingerprinting)

- (void)initRSAMobileSDK:(RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject {
    @try {
        int mConfiguration = 2;

        NSNumber *configuration = [[NSNumber alloc] initWithInt:mConfiguration];
        NSNumber *timeout = [[NSNumber alloc] initWithInt:TIMEOUT_DEFAULT_VALUE];
        NSNumber *silencePeriod = [[NSNumber alloc] initWithInt:SILENT_PERIOD_DEFAULT_VALUE];
        NSNumber *bestAge = [[NSNumber alloc] initWithInt:BEST_LOCATION_AGE_MINUTES_DEFAULT_VALUE];
        NSNumber *maxAge = [[NSNumber alloc] initWithInt:MAX_LOCATION_AGE_DAYS_DEFAULT_VALUE];
        NSNumber *maxAccuracy = [[NSNumber alloc] initWithInt:50];

        NSDictionary *properties;

        #if TARGET_IPHONE_SIMULATOR
        properties = [[NSDictionary alloc] initWithObjectsAndKeys:
                      configuration, @"Configuration-key",
                      timeout, timeout,
                      silencePeriod, silencePeriod,
                      bestAge, bestAge,
                      maxAge, maxAge,
                      maxAccuracy, maxAccuracy,
                      @"1", ENABLE_PHONE_CALL,
                      @"1", ENABLE_BIOMETRIC,
                      @"1", @"Add-timestamp-key",
                      nil];
        #else
        NSString *enableSensors = @"1";
        NSString *promptForPermission = @"true";
        NSString *promptFullAccuracyPermission = @"true";
        properties = [[NSDictionary alloc] initWithObjectsAndKeys:
                      configuration, CONFIGURATION_KEY,
                      timeout, TIMEOUT_MINUTES_KEY,
                      silencePeriod, SILENT_PERIOD_MINUTES_KEY,
                      bestAge, BEST_LOCATION_AGE_MINUTES_KEY,
                      maxAge, MAX_LOCATION_AGE_DAYS_KEY,
                      maxAccuracy, MAX_ACCURACY_KEY,
                      promptForPermission, PROMPT_FOR_PERMISSION_KEY,
                      promptFullAccuracyPermission, PROMPT_TMP_LOCATION_FULLACCURACY_KEY,
                      @"1", ADD_TIMESTAMP_KEY,
                      enableSensors, ENABLE_SENSOR_DATA,
                      @"1", ENABLE_PHONE_CALL,
                      @"1", ENABLE_BIOMETRIC,
                      nil];
        #endif

        mMobileAPI = [[MobileAPI alloc] init];
        BOOL initialized = [mMobileAPI initSDK:properties];

        [mMobileAPI addCustomElement:CUSTOM_ELEMENT_TYPE_STRING
                         elementName:@"KEYCHAIN_ERROR_ON_READ"
                        elementValue:@"Success"];
        [mMobileAPI addCustomElement:CUSTOM_ELEMENT_TYPE_STRING
                         elementName:@"KEYCHAIN_ERROR_ON_WRITE"
                        elementValue:@"Success"];

        if (initialized) {
            resolve(@(YES));
        } else {
            reject(@"RSA_INIT_ERROR", @"Failed to initialize RSA Mobile SDK", nil);
        }
    } @catch (NSException *exception) {
        reject(@"RSA_INIT_ERROR", [NSString stringWithFormat:@"Failed to initialize RSA Mobile SDK: %@", exception.reason], nil);
    }
}

- (void)fetchRSAMobileSDK:(RCTPromiseResolveBlock)resolve
                   reject:(RCTPromiseRejectBlock)reject {
    @try {
        if (mMobileAPI == nil) {
            reject(@"RSA_NOT_INITIALIZED", @"RSA Mobile SDK not initialized. Call initRSAMobileSDK first.", nil);
            return;
        }

        dispatch_async(dispatch_get_main_queue(), ^{
            NSString *deviceInfoStr = [self->mMobileAPI collectInfo];

            if (deviceInfoStr == nil) {
                reject(@"RSA_FETCH_ERROR", @"Failed to collect device info", nil);
                return;
            }

            NSDictionary *result = @{
                @"success": @"true",
                @"result": deviceInfoStr
            };

            resolve(result);
        });
    } @catch (NSException *exception) {
        reject(@"RSA_FETCH_ERROR", [NSString stringWithFormat:@"Failed to fetch RSA Mobile SDK data: %@", exception.reason], nil);
    }
}

- (void)getRSAMobileSDK:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject {
    @try {
        int mConfiguration = 2;

        NSNumber *configuration = [[NSNumber alloc] initWithInt:mConfiguration];
        NSNumber *timeout = [[NSNumber alloc] initWithInt:TIMEOUT_DEFAULT_VALUE];
        NSNumber *silencePeriod = [[NSNumber alloc] initWithInt:SILENT_PERIOD_DEFAULT_VALUE];
        NSNumber *bestAge = [[NSNumber alloc] initWithInt:BEST_LOCATION_AGE_MINUTES_DEFAULT_VALUE];
        NSNumber *maxAge = [[NSNumber alloc] initWithInt:MAX_LOCATION_AGE_DAYS_DEFAULT_VALUE];
        NSNumber *maxAccuracy = [[NSNumber alloc] initWithInt:50];

        NSDictionary *properties;

        #if TARGET_IPHONE_SIMULATOR
        properties = [[NSDictionary alloc] initWithObjectsAndKeys:
                      configuration, @"Configuration-key",
                      timeout, timeout,
                      silencePeriod, silencePeriod,
                      bestAge, bestAge,
                      maxAge, maxAge,
                      maxAccuracy, maxAccuracy,
                      @"1", @"Add-timestamp-key",
                      @"1", ENABLE_PHONE_CALL,
                      @"1", ENABLE_BIOMETRIC,
                      nil];
        #else
        NSString *enableSensors = @"1";
        NSString *promptForPermission = @"true";
        NSString *promptFullAccuracyPermission = @"true";
        properties = [[NSDictionary alloc] initWithObjectsAndKeys:
                      configuration, CONFIGURATION_KEY,
                      timeout, TIMEOUT_MINUTES_KEY,
                      silencePeriod, SILENT_PERIOD_MINUTES_KEY,
                      bestAge, BEST_LOCATION_AGE_MINUTES_KEY,
                      maxAge, MAX_LOCATION_AGE_DAYS_KEY,
                      maxAccuracy, MAX_ACCURACY_KEY,
                      promptForPermission, PROMPT_FOR_PERMISSION_KEY,
                      promptFullAccuracyPermission, PROMPT_TMP_LOCATION_FULLACCURACY_KEY,
                      @"1", ADD_TIMESTAMP_KEY,
                      enableSensors, ENABLE_SENSOR_DATA,
                      @"1", ENABLE_PHONE_CALL,
                      @"1", ENABLE_BIOMETRIC,
                      nil];
        #endif

        mMobileAPI = [[MobileAPI alloc] init];
        [mMobileAPI initSDK:properties];

        [mMobileAPI addCustomElement:CUSTOM_ELEMENT_TYPE_STRING
                         elementName:@"KEYCHAIN_ERROR_ON_READ"
                        elementValue:@"Success"];
        [mMobileAPI addCustomElement:CUSTOM_ELEMENT_TYPE_STRING
                         elementName:@"KEYCHAIN_ERROR_ON_WRITE"
                        elementValue:@"Success"];

        NSString *deviceInfoStr = [mMobileAPI collectInfo];
        [mMobileAPI destroy];

        if (deviceInfoStr == nil) {
            reject(@"RSA_GET_ERROR", @"Failed to collect device info", nil);
            return;
        }

        NSDictionary *result = @{
            @"success": @"true",
            @"result": deviceInfoStr
        };

        resolve(result);
    } @catch (NSException *exception) {
        reject(@"RSA_GET_ERROR", [NSString stringWithFormat:@"Failed to get RSA Mobile SDK data: %@", exception.reason], nil);
    }
}

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
    (const facebook::react::ObjCTurboModule::InitParams &)params
{
    return std::make_shared<facebook::react::NativeSecuritySdkSpecJSI>(params);
}

+ (NSString *)moduleName
{
  return @"SecuritySdk";
}

@end
