import * as Repack from '@callstack/repack';
import { ReanimatedPlugin } from '@callstack/repack-plugin-reanimated';
import rspack from '@rspack/core';
import { getSharedDependencies } from 'mobile-sdk';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default env => {
  const { mode, platform } = env;

  return Repack.defineRspackConfig({
    context: __dirname,
    entry: './index.js',
    resolve: {
      ...Repack.getResolveOptions(platform),
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
          exclude: /lucide-react-native\/dist\/esm\/icons\/infinity\.js$/,
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
        name: 'host',
        dts: false,
        remotes: {
          dashboard: `dashboard@http://localhost:8101/${platform}/mf-manifest.json`,
          transfer: `transfer@http://localhost:8102/${platform}/mf-manifest.json`,
          ca: `ca@http://localhost:8104/${platform}/mf-manifest.json`,
        },
        shared: getSharedDependencies({ eager: true }),
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
    // Watch ui-kit source files for hot reload
    watchOptions: {
      followSymlinks: true,
      ignored: /node_modules\/(?!ui-kit)/,
    },
  });
};
