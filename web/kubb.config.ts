import { defineConfig } from '@kubb/core';
import { pluginClient } from '@kubb/plugin-client';
import { pluginOas } from '@kubb/plugin-oas';
import { pluginTs } from '@kubb/plugin-ts';
import { pluginReactQuery } from '@kubb/plugin-react-query';

export default defineConfig({
  root: '.',
  input: {
    path: './../api/public/api-docs.json',
  },
  output: {
    path: './src/lib/http/generated',
    format: false,
  },
  plugins: [
    pluginOas({
      validate: false,
      generators: [],
    }),
    pluginTs({
      output: {
        path: 'models',
      },
    }),
    pluginClient({
      output: {
        path: '.',
      },
      importPath: '@/lib/http/api-client',
      dataReturnType: 'full',
    }),
    pluginReactQuery({
      output: {
        path: './hooks',
      },
    }),
  ],
});
