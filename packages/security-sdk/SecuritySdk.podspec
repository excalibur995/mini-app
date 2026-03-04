require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "SecuritySdk"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => min_ios_version_supported }
  s.source       = { :git => "https://github.maybank.com/nextgen/security-sdk.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,cpp}"
  s.private_header_files = "ios/**/*.h"

  # Libsodium dependencies - always included. Include both simulator and device RSA libs so
  # the correct archive is available for the target architecture (simulator vs device).
  s.vendored_libraries = "ios/libs/LibsodiumSDK/lib/ios/libsodium-ios.a", \
    "ios/libs/RSAMobileSDK/libMobileRsaSDKSimulator.a"
    # , \
    # "ios/libs/RSAMobileSDK/libMobileRsaSDK.a"

  s.preserve_paths = [
    "ios/libs/LibsodiumSDK/**/*",
    "ios/libs/RSAMobileSDK/**/*"
  ]

  # Conditionally link RSA Mobile SDK based on platform and expose feature flags
  s.pod_target_xcconfig = {
    # header and library search paths for the vendored libs
    'HEADER_SEARCH_PATHS' => '$(PODS_TARGET_SRCROOT)/ios/libs/LibsodiumSDK/SodiumObjc $(PODS_TARGET_SRCROOT)/ios/libs/LibsodiumSDK/lib/ios/include $(PODS_TARGET_SRCROOT)/ios/libs/RSAMobileSDK',
    'LIBRARY_SEARCH_PATHS' => '$(PODS_TARGET_SRCROOT)/ios/libs/LibsodiumSDK/lib/ios $(PODS_TARGET_SRCROOT)/ios/libs/RSAMobileSDK',
    # define feature flags so code compiled in the pod sees them
    # 'GCC_PREPROCESSOR_DEFINITIONS' => '$(inherited) FEATURE_ENABLE_BIOMETRIC=1 FEATURE_ENABLE_PHONE_CALL=1',
    # ensure correct linker flags per SDK
    'OTHER_LDFLAGS[sdk=iphonesimulator*]' => '-lsodium-ios -lMobileRsaSDKSimulator',
    'OTHER_LDFLAGS[sdk=iphoneos*]' => '-lsodium-ios -lMobileRsaSDK'
  }

  # NOTE: Removed user_target_xcconfig with OTHER_LDFLAGS because it was overriding
  # CocoaPods' default linker flags, breaking React Native linking.
  # The vendored libraries are already linked via s.vendored_libraries above.

  # System frameworks required by RSA Mobile SDK
  s.frameworks = [
    'CoreMotion',
    'CoreLocation',
    'CoreTelephony',
    'SystemConfiguration',
    'Security',
    'LocalAuthentication'
  ]

  install_modules_dependencies(s)
end
