import { defineConfig } from '@kubb/core';
import { pluginClient } from '@kubb/plugin-client';
import { pluginOas } from '@kubb/plugin-oas';
import { pluginTs } from '@kubb/plugin-ts';

export default defineConfig(() => {
  return {
    root: '.',
    input: {
      path: './../api/storage/api-docs/api-docs.json',
    },
    output: {
      path: './src/lib/http/generated',
    },
    plugins: [
      pluginOas({
        validate: false,
        serverIndex: 0,
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
        client: 'axios',
        importPath: '../../api-client',
        dataReturnType: 'full',
      }),
    ],
  };
});
