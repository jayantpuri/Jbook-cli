import { Command } from "Commander";
import * as path from "path";
import serve from "@react-code-notes/local-api";

interface localApiError {
  code: string;
}

const isProduction = process.env.NODE_ENV === 'production';

const serveCommand = new Command()
  .command("serve [fileName]")
  .description("opens a file for editing")
  .option(
    "-p, --port <port>",
    "specifies the port to run the application",
    "4050"
  )
  .action(async (fileName = "notbook.js", options: { port: string }) => {
    const dir = path.join(process.cwd(), path.dirname(fileName));
    const fullPath = path.join(dir, path.basename(fileName));

    const isLocalApiError = (err: any): err is localApiError => {
      return typeof err.code === "string";
    };

    try {
      await serve(fileName, parseInt(options.port), fullPath , isProduction);
      console.log(
        `file ${path.basename(fileName)} opened in http://localhost:${options.port}. Navigate to this URL to edit the file.`
      );
    } catch (err) {
      if (isLocalApiError(err)) {
        if (err.code === "EADDRINUSE") {
          console.error(
            "Port already in use, try running the application on a different port"
          );
        }
      } else if (err instanceof Error) {
        console.error(err.message);
      }
    }
  });

export default serveCommand;
