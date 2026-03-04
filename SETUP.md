# Re.Pack Setup Documentation

This document describes the Re.Pack and Rspack configuration for the React Native monorepo.

## Project Structure

```
nextgen/
├── apps/
│   ├── host/              # Main app (port 8000)
│   │   ├── rspack.config.js
│   │   ├── metro.config.js
│   │   ├── react-native.config.js
│   │   ├── src/
│   │   └── package.json
│   └── dashboard/         # Dashboard mini-app (port 8001, standalone: 8101)
│       ├── rspack.config.js
│       ├── metro.config.js
│       ├── react-native.config.js
│       ├── src/
│       └── package.json
├── packages/
│   └── mobile-sdk/        # Shared SDK package
├── mprocs/                # Multi-process runner configs
├── pnpm-workspace.yaml
├── package.json
└── SETUP.md
```

## Overview

This monorepo uses **Re.Pack** with **Rspack** as the primary bundler for React Native applications. Metro bundler configuration is preserved for compatibility.

### Key Technologies

- **Re.Pack**: Modern bundler for React Native (v5.2.1)
- **Rspack**: Rust-based fast bundler (v1.5.8)
- **React Native**: v0.81.4
- **Package Manager**: pnpm (v9.15.3)
- **Node**: >=22

## Installation & Dependencies

### Core Dependencies

Both apps include the following dependencies:

#### Production Dependencies
```json
{
  "@babel/runtime": "^7.25.0",
  "@swc/helpers": "^0.5.17",
  "react": "19.1.0",
  "react-native": "0.81.4",
  "@react-native/new-app-screen": "0.81.4",
  "@react-navigation/native": "^7.1.18",
  "@react-navigation/native-stack": "^7.3.28",
  "@react-navigation/bottom-tabs": "^7.4.9",
  "react-native-gesture-handler": "^2.28.0",
  "react-native-pager-view": "^6.9.1",
  "react-native-safe-area-context": "^5.5.2",
  "react-native-screens": "^4.16.0",
  "mobile-sdk": "file:../../packages/mobile-sdk"
}
```

**Important Notes**:
- `@babel/runtime` must be in `dependencies` (not `devDependencies`) because it's required at runtime by Babel-transpiled code
- `@swc/helpers` is required by Re.Pack for code transformation with SWC

#### Development Dependencies
```json
{
  "@callstack/repack": "^5.2.1",
  "@rspack/core": "^1.5.8",
  "@module-federation/enhanced": "^0.8.4",
  "@babel/core": "^7.25.2",
  "@babel/preset-env": "^7.25.3",
  "@react-native-community/cli": "20.0.0",
  "@react-native-community/cli-platform-android": "20.0.0",
  "@react-native-community/cli-platform-ios": "20.0.0",
  "@react-native/babel-preset": "0.81.4",
  "@react-native/eslint-config": "0.81.4",
  "@react-native/metro-config": "0.81.4",
  "@react-native/typescript-config": "0.81.4",
  "@types/jest": "^29.5.13",
  "@types/react": "^19.1.0",
  "@types/react-test-renderer": "^19.1.0",
  "eslint": "^8.19.0",
  "jest": "^29.6.3",
  "prettier": "2.8.8",
  "react-test-renderer": "19.1.0",
  "typescript": "^5.8.3"
}
```

## Configuration Files

### 1. Rspack Configuration

Both apps have an `rspack.config.js` file for Re.Pack bundling.

#### Host App (`apps/host/rspack.config.js`)

```javascript
const path = require('path');
const Repack = require('@callstack/repack');

module.exports = (env) => {
  const {
    mode = 'development',
    platform,
    entry = './index.js',
    bundleFilename = 'index.bundle',
  } = env;

  return {
    mode,
    entry: path.join(__dirname, entry),
    output: {
      path: path.join(__dirname, 'build', platform),
      filename: bundleFilename,
      chunkFilename: '[name].chunk.bundle',
      publicPath: 'http://localhost:8000/',
    },
    resolve: {
      extensions: [
        `.${platform}.js`,
        `.${platform}.jsx`,
        `.${platform}.ts`,
        `.${platform}.tsx`,
        '.native.js',
        '.native.jsx',
        '.native.ts',
        '.native.tsx',
        '.js',
        '.jsx',
        '.ts',
        '.tsx',
        '.json',
      ],
      alias: {
        'react-native': path.join(__dirname, 'node_modules/react-native'),
      },
    },
    devServer: {
      port: 8000,
      hot: true,
      liveReload: false,
      devMiddleware: {
        publicPath: '/',
      },
      static: {
        directory: path.join(__dirname, 'build', platform),
      },
    },
    plugins: [
      new Repack.RepackPlugin({
        context: __dirname,
        mode,
        platform,
        entry,
        output: {
          bundleFilename,
        },
      }),
    ],
  };
};
```

#### Dashboard App (`apps/dashboard/rspack.config.js`)

Same configuration as host, except:
- `publicPath: 'http://localhost:8001/'`
- `devServer.port: 8001`

#### Key Configuration Features

1. **Platform-Specific Resolution**: Automatically resolves `.ios.js`, `.android.js`, `.native.js` files
2. **Monorepo Aliasing**: Ensures `react-native` is resolved from the correct `node_modules`
3. **Hot Module Replacement**: Enabled for fast development
4. **Code Splitting**: Supports chunk-based code splitting with `[name].chunk.bundle`
5. **RepackPlugin**: Handles React Native-specific bundling requirements

### 2. Metro Configuration (Fallback)

Both apps have a `metro.config.js` for compatibility and monorepo module resolution.

```javascript
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');
const path = require('path');

const workspaceRoot = path.resolve(__dirname, '../..');
const projectRoot = __dirname;

const config = {
  watchFolders: [workspaceRoot],
  resolver: {
    nodeModulesPaths: [
      path.resolve(projectRoot, 'node_modules'),
      path.resolve(workspaceRoot, 'node_modules'),
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
```

#### Purpose

- **Monorepo Support**: Resolves modules from both app-level and workspace-level `node_modules`
- **Fallback**: Allows using Metro bundler if needed (though Rspack is preferred)

### 3. React Native CLI Configuration

Both apps have a `react-native.config.js` to register Re.Pack commands with React Native CLI.

```javascript
module.exports = {
  commands: require('@callstack/repack/commands/rspack'),
  project: {
    ios: {
      automaticPodsInstallation: true,
    },
  },
};
```

#### Purpose

- **Register Re.Pack Commands**: Makes `react-native webpack-start` and `react-native webpack-bundle` available
- **Automatic Pods**: Automatically runs `pod install` when iOS dependencies change
- **CLI Integration**: Ensures React Native CLI uses Rspack bundler instead of Metro

### 4. Package.json Scripts

#### Host App (`apps/host/package.json`)

```json
{
  "scripts": {
    "android": "react-native run-android --port=8000",
    "ios": "react-native run-ios --port=8000",
    "start": "react-native start --port=8000",
    "bundle:ios": "react-native bundle --platform ios --entry-file index.js",
    "bundle:android": "react-native bundle --platform android --entry-file index.js",
    "test": "jest",
    "lint": "eslint .",
    "postinstall": "npx pod-install",
    "pods": "cd ios && pod install && cd ..",
    "pods:update": "cd ios && pod update && cd .."
  }
}
```

#### Dashboard App (`apps/dashboard/package.json`)

```json
{
  "scripts": {
    "android": "react-native run-android --port=8101",
    "ios": "react-native run-ios --port=8101",
    "start": "react-native start --port=8001",
    "start:standalone": "STANDALONE=1 react-native start --port=8101",
    "bundle:ios": "react-native bundle --platform ios --entry-file index.js",
    "bundle:android": "react-native bundle --platform android --entry-file index.js",
    "test": "jest",
    "lint": "eslint .",
    "postinstall": "npx pod-install",
    "pods": "cd ios && pod install && cd ..",
    "pods:update": "cd ios && pod update && cd .."
  }
}
```

**Important Notes**:
- Dashboard uses port `8001` for Module Federation mode (loaded by host)
- Dashboard uses port `8101` for standalone mode with the `start:standalone` script
- The `STANDALONE=1` environment variable can be used to configure different behavior in standalone vs federated mode

#### Script Descriptions

- `start`: Starts the bundler dev server (Module Federation mode for dashboard)
- `start:standalone`: Starts the dashboard in standalone mode (only for dashboard)
- `ios/android`: Runs the app on iOS/Android (starts bundler automatically)
- `bundle:ios/android`: Creates production bundles
- `postinstall`: Automatically runs `pod install` after dependency installation
- `pods`: Manually install iOS CocoaPods dependencies
- `pods:update`: Update iOS CocoaPods dependencies

## Usage

### Development

#### Start Development Server

```bash
# Host app (uses mprocs to run host + dashboard in Module Federation mode)
pnpm start
# or
pnpm --filter host start

# Dashboard app (Module Federation mode - loaded by host)
pnpm --filter dashboard start

# Dashboard app (Standalone mode - runs independently)
pnpm dashboard:start
# or
pnpm --filter dashboard start:standalone
```

#### Run on Device/Simulator

```bash
# iOS
pnpm --filter host ios
pnpm --filter dashboard ios

# Android
pnpm --filter host android
pnpm --filter dashboard android

# Or use root scripts
pnpm ios              # Runs host app
pnpm dashboard:ios    # Runs dashboard app
```

#### Install Dependencies

```bash
# Install all dependencies (root)
pnpm install

# Install for specific app
pnpm --filter host install
pnpm --filter dashboard install

# Install new dependency
pnpm add <package-name> --filter host
```

#### iOS Pod Management

```bash
# Install pods (auto-runs after pnpm install)
pnpm pods

# Update pods
pnpm pods:update

# For specific app
pnpm --filter host pods
```

### Production

#### Create Production Bundles

```bash
# iOS bundle
pnpm --filter host bundle:ios
pnpm --filter dashboard bundle:ios

# Android bundle
pnpm --filter host bundle:android
pnpm --filter dashboard bundle:android
```

Bundles are created in `apps/{app}/build/{platform}/` directory.

### Monorepo Commands

```bash
# Run script in all apps
pnpm -r <script-name>

# Examples
pnpm lint             # Lint all apps (alias from root)
pnpm test             # Test all apps (alias from root)
pnpm typecheck        # Type check all apps (alias from root)
pnpm -r align-deps    # Align dependencies across apps
pnpm -r check-deps    # Check dependency versions

# Clean everything
pnpm clean            # Removes all node_modules, build artifacts, pods
```

### Using mprocs

The project includes `mprocs` for running multiple processes simultaneously:

```bash
# Start both host and dashboard bundlers together
pnpm start

# This runs the mprocs/host.yaml configuration
# which starts both apps in Module Federation mode
```

## Troubleshooting

### Module Resolution Issues

If you encounter module resolution errors:

1. **Clear caches**:
   ```bash
   # Clear Metro cache
   pnpm --filter host start --reset-cache

   # Clear Rspack cache
   rm -rf apps/host/build apps/dashboard/build
   ```

2. **Reinstall dependencies**:
   ```bash
   pnpm clean
   pnpm install
   ```

3. **Reinstall pods**:
   ```bash
   pnpm pods:update
   ```

### Common Errors

#### `@babel/runtime/helpers/interopRequireDefault` not found

**Solution**: Ensure `@babel/runtime` is in `dependencies` (not `devDependencies`)

```json
{
  "dependencies": {
    "@babel/runtime": "^7.25.0"
  }
}
```

#### `@swc/helpers/_/_interop_require_default` not found

**Solution**: Install `@swc/helpers` as a production dependency

```bash
pnpm add @swc/helpers --filter host
pnpm add @swc/helpers --filter dashboard
```

#### `repack react-native module was not found`

**Solution**: Clean and rebuild iOS native modules

```bash
cd apps/host/ios
rm -rf build Pods Podfile.lock
pod install
# Then rebuild in Xcode or via CLI
pnpm --filter host ios
```

This error occurs when:
- Re.Pack native module isn't linked properly
- iOS build is stale after installing Re.Pack
- CocoaPods cache needs refreshing

#### Metro bundler starts instead of Rspack

Re.Pack automatically detects `rspack.config.js`. If Metro starts:

1. Check that `rspack.config.js` exists in the app root
2. Check that `@callstack/repack` is installed
3. Check that `react-native.config.js` exists and properly configured
4. Verify React Native CLI can find Re.Pack commands: `npx react-native --help`

#### iOS Build Fails

1. Clean iOS build:
   ```bash
   cd apps/host/ios
   rm -rf build Pods Podfile.lock
   pod install
   ```

2. Ensure Xcode is properly configured
3. Check that `postinstall` hook ran successfully

#### Port Already in Use

If ports 8000/8001 are in use:

1. Kill existing processes:
   ```bash
   lsof -ti:8000 | xargs kill -9
   lsof -ti:8001 | xargs kill -9
   ```

2. Or change ports in:
   - `package.json` scripts
   - `rspack.config.js` (publicPath and devServer.port)

## Advanced Configuration

### Module Federation

This project uses Module Federation for micro-frontend architecture with `@module-federation/enhanced`.

#### Architecture

- **Host App**: Main container app that loads federated modules from dashboard
- **Dashboard App**: Federated mini-app that can run standalone or be loaded by host
  - Module Federation mode: Port 8001 (loaded by host)
  - Standalone mode: Port 8101 (runs independently)

#### Configuration

Both apps have Module Federation already configured in their `rspack.config.js`:

**Host App** exposes modules and consumes dashboard:
```javascript
const { ModuleFederationPlugin } = require('@module-federation/enhanced/rspack');

plugins: [
  new ModuleFederationPlugin({
    name: 'host',
    remotes: {
      dashboard: 'dashboard@http://localhost:8001/remoteEntry.js',
    },
    shared: {
      react: { singleton: true },
      'react-native': { singleton: true },
    },
  }),
]
```

**Dashboard App** exposes its modules:
```javascript
new ModuleFederationPlugin({
  name: 'dashboard',
  filename: 'remoteEntry.js',
  exposes: {
    './App': './src/App',
    './screens/AppContent': './src/screens/AppContent',
  },
  shared: {
    react: { singleton: true },
    'react-native': { singleton: true },
  },
})
```

### Custom Loaders

Add custom loaders in `rspack.config.js`:

```javascript
module: {
  rules: [
    {
      test: /\.svg$/,
      use: '@svgr/webpack',
    },
    {
      test: /\.(png|jpg|gif)$/,
      type: 'asset/resource',
    },
  ],
}
```

### Environment Variables

Use `.env` files with `dotenv`:

```bash
pnpm add -D dotenv --filter host
```

```javascript
// rspack.config.js
require('dotenv').config();

module.exports = (env) => ({
  // ... other config
  plugins: [
    new Repack.plugins.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
    }),
  ],
});
```

## Performance Tips

1. **Use Rspack over Webpack**: 5-10x faster build times
2. **Enable Code Splitting**: Reduces initial bundle size
3. **Tree Shaking**: Automatically enabled in production mode
4. **Cache Invalidation**: Rspack caches builds for faster rebuilds
5. **Monorepo Optimization**: Shared dependencies reduce duplication

## Resources

- [Re.Pack Documentation](https://re-pack.dev/docs)
- [Re.Pack Configuration Guide](https://re-pack.dev/docs/guides/configuration)
- [Rspack Documentation](https://rspack.dev/)
- [React Native Documentation](https://reactnative.dev/)
- [pnpm Workspaces](https://pnpm.io/workspaces)

## Version Compatibility

| Package | Version | Notes |
|---------|---------|-------|
| React | 19.1.0 | Latest stable |
| React Native | 0.81.4 | Re.Pack requires >=0.74.0 |
| Node | >=20 | Minimum required version |
| Re.Pack | 5.2.1 | Latest stable |
| Rspack | 1.5.8 | Latest stable |
| Module Federation | 0.8.4 | Enhanced version for Rspack |
| React Navigation | 7.x | Navigation library |
| pnpm | 9.15.3 | Workspace manager |
| TypeScript | 5.8.3 | Type safety |
| @babel/runtime | 7.25.0 | Required in dependencies |
| @swc/helpers | 0.5.17 | Required for SWC transforms |
| mprocs | 0.7.3 | Multi-process runner |

## Migration Notes

### From Metro to Re.Pack

This setup maintains backward compatibility with Metro. To fully migrate to Re.Pack:

1. React Native CLI auto-detects Re.Pack via `react-native.config.js`
2. `rspack.config.js` takes precedence over `metro.config.js`
3. No changes needed to existing React Native code
4. Babel configuration is preserved and used by Re.Pack
5. Native modules are linked via CocoaPods (`callstack-repack` pod)

### From Webpack to Rspack

The migration was straightforward:

1. Replaced `webpack.config.js` with `rspack.config.js`
2. Installed `@rspack/core` instead of `webpack`
3. Configuration is almost identical (API compatible)
4. No changes needed to Re.Pack plugin usage

## Support

For issues or questions:

1. Check Re.Pack GitHub issues: https://github.com/callstack/repack/issues
2. Check Rspack documentation: https://rspack.dev/
3. Review this documentation's troubleshooting section
4. Check React Native Community CLI: https://github.com/react-native-community/cli

## Files Created/Modified During Setup

### Created Files
- `/apps/host/rspack.config.js` - Rspack bundler configuration for host app
- `/apps/dashboard/rspack.config.js` - Rspack bundler configuration for dashboard app
- `/apps/host/react-native.config.js` - React Native CLI configuration for host app
- `/apps/dashboard/react-native.config.js` - React Native CLI configuration for dashboard app
- `/apps/host/metro.config.js` - Metro fallback configuration with monorepo support
- `/apps/dashboard/metro.config.js` - Metro fallback configuration with monorepo support
- `/SETUP.md` - This documentation file

### Modified Files
- `/apps/host/package.json` - Updated dependencies and scripts
- `/apps/dashboard/package.json` - Updated dependencies and scripts
- `/package.json` - Updated pnpm configuration
- `/apps/host/ios/Podfile` - Auto-updated by CocoaPods (includes `callstack-repack`)
- `/apps/dashboard/ios/Podfile` - Auto-updated by CocoaPods (includes `callstack-repack`)

### Key Dependencies Added
```json
{
  "dependencies": {
    "@babel/runtime": "^7.25.0",
    "@swc/helpers": "^0.5.17",
    "@react-navigation/native": "^7.1.18",
    "@react-navigation/native-stack": "^7.3.28",
    "@react-navigation/bottom-tabs": "^7.4.9",
    "react-native-screens": "^4.16.0",
    "react-native-safe-area-context": "^5.5.2",
    "react-native-gesture-handler": "^2.28.0",
    "mobile-sdk": "file:../../packages/mobile-sdk"
  },
  "devDependencies": {
    "@callstack/repack": "^5.2.1",
    "@rspack/core": "^1.5.8",
    "@module-federation/enhanced": "^0.8.4",
    "@react-native-community/cli": "20.0.0",
    "typescript": "^5.8.3"
  }
}
```

### iOS Pods Added
- `callstack-repack (5.2.1)` - Re.Pack native module for iOS
- `JWTDecode (3.0.1)` - Dependency of callstack-repack
- `SwiftyRSA (1.7.0)` - Dependency of callstack-repack

## Shared Packages

### mobile-sdk

The project includes a shared `mobile-sdk` package in `packages/mobile-sdk/` that contains common utilities and components used across both host and dashboard apps.

To use:
```typescript
import { /* exports */ } from 'mobile-sdk';
```

Both apps have it as a dependency:
```json
{
  "dependencies": {
    "mobile-sdk": "file:../../packages/mobile-sdk"
  }
}
```

## Key Features

1. **Module Federation Architecture**: Host app can dynamically load dashboard app at runtime
2. **Monorepo Structure**: Shared dependencies and tooling across multiple apps
3. **TypeScript Support**: Full type safety with TypeScript 5.8.3
4. **React Navigation**: Complete navigation setup with bottom tabs and stack navigators
5. **Hot Module Replacement**: Fast development with HMR via Rspack
6. **Multi-process Development**: Use mprocs to run multiple apps simultaneously
7. **Shared SDK**: Common utilities via the mobile-sdk package

---

**Last Updated**: 2025-10-17
**Setup Version**: 2.0
**Maintained By**: Development Team
