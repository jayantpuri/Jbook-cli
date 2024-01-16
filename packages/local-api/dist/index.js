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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path = __importStar(require("path"));
const http_proxy_middleware_1 = require("http-proxy-middleware");
const cells_1 = require("./routes/cells");
const serve = (fileName, port, directory, isProduction) => {
    const app = (0, express_1.default)();
    app.use(express_1.default.json());
    app.use("/cells", (0, cells_1.cellsRouter)(fileName, directory));
    if (isProduction) {
        const absolutePath = require.resolve("@react-code-notes/client/build/index.html");
        app.use(express_1.default.static(path.dirname(absolutePath)));
    }
    else {
        app.use((0, http_proxy_middleware_1.createProxyMiddleware)({
            target: "http://127.0.0.1:3000",
            ws: true,
            logLevel: "silent",
        }));
    }
    return new Promise((resolve, reject) => {
        app.listen(port, resolve).on("error", reject);
    });
};
exports.default = serve;
