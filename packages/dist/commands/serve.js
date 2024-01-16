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
const Commander_1 = require("Commander");
const path = __importStar(require("path"));
const local_api_1 = __importDefault(require("@react-code-notes/local-api"));
const isProduction = process.env.NODE_ENV === 'production';
const serveCommand = new Commander_1.Command()
    .command("serve [fileName]")
    .description("opens a file for editing")
    .option("-p, --port <port>", "specifies the port to run the application", "4050")
    .action((fileName = "notbook.js", options) => __awaiter(void 0, void 0, void 0, function* () {
    const dir = path.join(process.cwd(), path.dirname(fileName));
    const fullPath = path.join(dir, path.basename(fileName));
    const isLocalApiError = (err) => {
        return typeof err.code === "string";
    };
    try {
        yield (0, local_api_1.default)(fileName, parseInt(options.port), fullPath, isProduction);
        console.log(`file ${path.basename(fileName)} opened in http://localhost:${options.port}. Navigate to this URL to edit the file.`);
    }
    catch (err) {
        if (isLocalApiError(err)) {
            if (err.code === "EADDRINUSE") {
                console.error("Port already in use, try running the application on a different port");
            }
        }
        else if (err instanceof Error) {
            console.error(err.message);
        }
    }
}));
exports.default = serveCommand;
