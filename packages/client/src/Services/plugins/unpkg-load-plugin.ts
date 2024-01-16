import * as esbuild from "esbuild-wasm";
import axios from "axios";
import localforage from "localforage";

const cachedFiles = localforage.createInstance({
  name: "cachedFiles",
});

export const unpkgLoadPlugin = (code: string) => {
  return {
    name: "unpkg-load-plugin",
    setup(build: esbuild.PluginBuild) {
      build.onLoad({ filter: /^index.js$/ }, async (args: any) => {
        return {
          loader: "jsx",
          contents: code,
        };
      });
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const file = await cachedFiles.getItem<esbuild.OnLoadResult>(args.path);
        if (file) {
          return file;
        } else {
          return null;
        }
      });

      build.onLoad({ filter: /.css$/ }, async (args: any) => {
        const { data, request } = await axios.get<esbuild.OnLoadResult>(
          args.path
        );
        const cssCode = `const styleElement =  document.createElement('style');
        styleElement.innerText = \`${data}\`;
        document.head.appendChild(styleElement);`;

        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: cssCode,
          resolveDir: new URL("./", request.responseURL).pathname,
        };
        await cachedFiles.setItem(args.path, result);
        return result;
      });
      
      build.onLoad({ filter: /.*/ }, async (args: any) => {
        const { data, request } = await axios.get(args.path);
        const result: esbuild.OnLoadResult = {
          loader: "jsx",
          contents: data,
          resolveDir: new URL("./", request.responseURL).pathname,
        };

        await cachedFiles.setItem(args.path, result);
        return result;
      });
    },
  };
};
