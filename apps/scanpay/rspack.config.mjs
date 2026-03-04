import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Repack from '@callstack/repack';
import rspack from '@rspack/core';
import { ReanimatedPlugin } from '@callstack/repack-plugin-reanimated';
import { getSharedDependencies } from 'mobile-sdk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STANDALONE = Boolean(process.env.STANDALONE);

/**
 * Rspack configuration enhanced with Re.Pack defaults for React Native.
 *
 * Learn about Rspack configuration: https://rspack.dev/config/
 * Learn about Re.Pack configuration: https://re-pack.dev/docs/guides/configuration
 */

export default (env, argv) => {
  const { mode, platform } = env;

  return Repack.defineRspackConfig({
    context: __dirname,
    entry: './index.js',
    resolve: {
      ...Repack.getResolveOptions(),
      // Direct source mapping - no build needed!
      alias: {
        'ui-kit': path.resolve(__dirname, '../../packages/ui-kit/src'),
      },
      symlinks: true,
    },
    module: {
      rules: [
        {
          test: /\.[cm]?[jt]sx?$/,
          type: 'javascript/auto',
          use: {
            loader: '@callstack/repack/babel-swc-loader',
            parallel: true,
            options: {
              jsc: {
                externalHelpers: false, // Inline helpers instead of importing
                transform: {
                  react: {
                    development: mode === 'development',
                    refresh: mode === 'development', // Enable Fast Refresh
                  },
                },
              },
              unstable_disableTransform: [
                'react-native-reanimated',
                'react-native-worklets',
              ],
            },
          },
        },
        ...Repack.getAssetTransformRules({ inline: !STANDALONE }),
      ],
    },
    plugins: [
      new Repack.RepackPlugin(),
      new ReanimatedPlugin({ disableLoader: true }),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'scanpay',
        filename: 'scanpay.container.js.bundle',
        dts: false,
        exposes: STANDALONE
          ? undefined
          : { './App': './src/screens/AppContent' },
        shared: getSharedDependencies({ eager: STANDALONE }),
      }),
      new Repack.plugins.CodeSigningPlugin({
        enabled: mode === 'production',
        privateKeyPath: path.join('..', '..', 'code-signing.pem'),
      }),
      // silence missing @react-native-masked-view optionally required by @react-navigation/elements
      new rspack.IgnorePlugin({
        resourceRegExp: /^@react-native-masked-view/,
      }),
    ],
    // Watch ui-kit source files for hot reload
    watchOptions: {
      followSymlinks: true,
      ignored: /node_modules\/(?!ui-kit)/,
    },
  });
};
