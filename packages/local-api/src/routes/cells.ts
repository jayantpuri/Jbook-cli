import express from "express";
import fs from "fs/promises";
import * as path from "path";

interface cellsRouterError {
  code: string;
}

type CellType = "text" | "code";

interface Cell {
  id: string;
  content: string;
  type: CellType;
}

export const cellsRouter = (fileName: string, directory: string) => {
  const dir = path.join(__dirname, path.dirname(fileName));
  const fullName = path.join(dir, path.basename(fileName));

  console.log(fullName);
  const Router = express.Router();

  Router.get("/", async (req, res) => {
    const cellsError = (err: any): err is cellsRouterError => {
      return typeof err.code === "string";
    };

    try {
      const file = await fs.readFile(fullName, { encoding: "utf-8" });
      res.send(JSON.parse(file));
    } catch (error) {
      if (cellsError(error)) {
        if (error.code === "ENOENT") {
          await fs.writeFile(fullName, "[]", { encoding: "utf-8" });
          res.send([]);
        }
      } else {
        throw error;
      }
    }
  });

  Router.post("/", async (req, res) => {
    const { cells }: { cells: Cell[] } = req.body;
    await fs.writeFile(fullName, JSON.stringify(cells), "utf-8");

    res.send({ status: "ok" });
  });

  return Router;
};
