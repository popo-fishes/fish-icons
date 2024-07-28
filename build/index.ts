/*
 * @Date: 2024-01-13 13:11:45
 * @Description: Modify here please
 */
import path from "node:path";
import type { BuildOptions, Format } from "esbuild";
import { build } from "esbuild";
import { emptyDir } from "fs-extra";

import { pathOutput, pathSrc } from "./paths";

const buildBundle = () => {
  const getBuildOptions = (format: Format) => {
    const options: BuildOptions = {
      // https://esbuild.github.io/api/#entry-points
      entryPoints: [path.resolve(pathSrc, "index.ts")],
      // https://esbuild.github.io/api/#target
      target: "es2018",
      // https://esbuild.github.io/api/#platform
      platform: "neutral",
      plugins: [],
      // https://esbuild.github.io/api/#bundle
      bundle: true,
      format,
      // minify: true,
      // https://esbuild.github.io/api/#minify
      minifySyntax: true,
      // https://esbuild.github.io/api/#external
      external: ["react"],
      outdir: pathOutput
    };

    return options;
  };
  const doBuild = async () => {
    await Promise.all([
      build({
        ...getBuildOptions("esm"),
        // https://esbuild.github.io/api/#entry-names
        entryNames: `[name]`,
        // https://esbuild.github.io/api/#out-extension
        outExtension: { ".js": ".mjs" }
      }),
      build({
        ...getBuildOptions("cjs"),
        entryNames: `[name]`
      })
    ]);
  };

  return doBuild();
};

await emptyDir(pathOutput);

await buildBundle();
