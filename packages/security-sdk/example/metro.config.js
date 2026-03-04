const path = require('path');
const { getDefaultConfig } = require('@react-native/metro-config');
const { withMetroConfig } = require('react-native-monorepo-config');

const root = path.resolve(__dirname, '..');

/**
 * Metro configuration
 * https://facebook.github.io/metro/docs/configuration
 *
 * @type {import('metro-config').MetroConfig}
 */
const config = withMetroConfig(getDefaultConfig(__dirname), {
  root,
  dirname: __dirname,
});

// Add resolver configuration to handle pnpm symlinks
config.resolver = {
  ...config.resolver,
  nodeModulesPaths: [
    path.resolve(__dirname, 'node_modules'),
    path.resolve(__dirname, '../node_modules'),
    path.resolve(__dirname, '../../node_modules'),
    path.resolve(__dirname, '../../../node_modules'),
  ],
  // Resolve symlinks to their real path - critical for pnpm
  unstable_enableSymlinks: true,
  resolveRequest: null,
};

// Enable symlinks and add watch folders for pnpm .pnpm store
config.watchFolders = [
  ...(config.watchFolders || []),
  path.resolve(__dirname, '../../../node_modules'),
];

module.exports = config;
