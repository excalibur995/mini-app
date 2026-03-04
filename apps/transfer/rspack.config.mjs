import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Repack from '@callstack/repack';
import rspack from '@rspack/core';
import { ReanimatedPlugin } from '@callstack/repack-plugin-reanimated';
import { getSharedDependencies } from 'mobile-sdk';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const STANDALONE = Boolean(process.env.STANDALONE);

export default env => {
  const { mode } = env;

  return Repack.defineRspackConfig({
    context: __dirname,
    entry: './index.js',
    resolve: {
      ...Repack.getResolveOptions(),
      // Direct source mapping - no build needed!
      alias: {
        'ui-kit': path.resolve(__dirname, '../../packages/ui-kit/src'),
        'ui-kit/assets': path.resolve(
          __dirname,
          '../../packages/ui-kit/src/assets',
        ),
        // Exclude problematic lucide icons that conflict with JS globals
        'lucide-react-native/dist/esm/icons/infinity': false,
      },
      symlinks: true,
    },
    module: {
      rules: [
        {
          test: /\.[cm]?[jt]sx?$/,
          exclude: /lucide-react-native\/dist\/esm\/icons\/infinity\.js$/,
          type: 'javascript/auto',
          use: {
            loader: '@callstack/repack/babel-swc-loader',
            parallel: true,
            options: {
              jsc: {
                externalHelpers: false,
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
        ...Repack.getAssetTransformRules({
          inline: true,
          svg: 'svgr',
        }),
      ],
    },
    plugins: [
      new Repack.RepackPlugin(),
      new ReanimatedPlugin({ disableLoader: true }),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'transfer',
        filename: 'transfer.container.js.bundle',
        dts: false,
        exposes: { './Navigator': './src/App' },
        shared: getSharedDependencies({ eager: false }),
      }),
      new Repack.plugins.CodeSigningPlugin({
        enabled: mode === 'production',
        privateKeyPath: path.join('..', '..', 'code-signing.pem'),
      }),
      new rspack.IgnorePlugin({
        resourceRegExp: /^@react-native-masked-view/,
      }),

      // Replace lucide infinity icon with empty module to prevent JS global conflict
      new rspack.NormalModuleReplacementPlugin(
        /lucide-react-native\/dist\/esm\/icons\/infinity/,
        path.resolve(__dirname, 'empty-module.js'),
      ),
    ],
    watchOptions: {
      followSymlinks: true,
      ignored: ['**/node_modules/**', '!**/packages/ui-kit/**'],
      poll: 1000,
      aggregateTimeout: 200,
    },
  });
};
