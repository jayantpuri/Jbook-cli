"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cellsRouter = void 0;
const express_1 = __importDefault(require("express"));
const promises_1 = __importDefault(require("fs/promises"));
const path = __importStar(require("path"));
const cellsRouter = (fileName, directory) => {
    const dir = path.join(__dirname, path.dirname(fileName));
    const fullName = path.join(dir, path.basename(fileName));
    console.log(fullName);
    const Router = express_1.default.Router();
    Router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const cellsError = (err) => {
            return typeof err.code === "string";
        };
        try {
            const file = yield promises_1.default.readFile(fullName, { encoding: "utf-8" });
            res.send(JSON.parse(file));
        }
        catch (error) {
            if (cellsError(error)) {
                if (error.code === "ENOENT") {
                    yield promises_1.default.writeFile(fullName, "[]", { encoding: "utf-8" });
                    res.send([]);
                }
            }
            else {
                throw error;
            }
        }
    }));
    Router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { cells } = req.body;
        yield promises_1.default.writeFile(fullName, JSON.stringify(cells), "utf-8");
        res.send({ status: "ok" });
    }));
    return Router;
};
exports.cellsRouter = cellsRouter;
