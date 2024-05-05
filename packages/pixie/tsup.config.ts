import { defineConfig } from "tsup";

export default defineConfig((options) => {
  return {
    entry: ["./src/index.ts"],
    format: ["esm", "cjs"],
    dts: true,
    clean: true,
    minify: !options.watch,
    sourcemap: true,
  };
});
