import * as esbuild from "esbuild-wasm";
import { unpkgBuildPlugin } from "./plugins/unpkg-build-plugin";
import { unpkgLoadPlugin } from "./plugins/unpkg-load-plugin";

let service: esbuild.Service;

export const EsbuildService = async (input: string) => {
  const intializeEsbundle = async () => {
    service = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };
  if (!service) {
    await intializeEsbundle();
  }

  try {
    const result = await service.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgBuildPlugin(), unpkgLoadPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
      jsxFactory: '_React.createElement',
      jsxFragment: '_React.Fragment'
    });
    return { 
      code: result.outputFiles[0].text, 
      err: '',
    };
  } 
  catch (error: any) {
    return {
      code: '',
      err: error.message,
    };
  }
};
