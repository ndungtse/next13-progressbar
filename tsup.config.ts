import { Options } from 'tsup';
export const tsup: Options = {
  target: 'esnext',
  clean: true,
  // tsup passes `baseUrl` to the dts build, which TypeScript 6 deprecates
  dts: { compilerOptions: { ignoreDeprecations: '6.0' } },
  entry: ['src/index.ts'],
  keepNames: true,
  minify: true,
  sourcemap: true,
  format: ['cjs'],
};
