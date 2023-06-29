import { Options } from 'tsup';
export const tsup: Options = {
  target: 'esnext',
  clean: true,
  dts: true,
  entry: ['src/index.ts'],
  keepNames: true,
  minify: true,
  sourcemap: true,
  format: ['cjs'],
};
