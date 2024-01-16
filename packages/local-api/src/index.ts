import express from "express";
import * as path from "path";
import { createProxyMiddleware } from "http-proxy-middleware";
import { cellsRouter } from "./routes/cells";

const serve = (
  fileName: string,
  port: number,
  directory: string,
  isProduction: boolean
) => {
  const app = express();
  app.use(express.json());

  app.use("/cells", cellsRouter(fileName, directory));

  if (isProduction) {
    const absolutePath = require.resolve("@react-code-notes/client/build/index.html");
    app.use(express.static(path.dirname(absolutePath)));
  } else {
    app.use(
      createProxyMiddleware({
        target: "http://127.0.0.1:3000",
        ws: true,
        logLevel: "silent",
      })
    );
  }

  return new Promise<void>((resolve, reject) => {
    app.listen(port, resolve).on("error", reject);
  });
};

export default serve;
