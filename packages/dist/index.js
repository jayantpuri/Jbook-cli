"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Commander_1 = require("Commander");
const serve_1 = __importDefault(require("./commands/serve"));
Commander_1.program.addCommand(serve_1.default);
Commander_1.program.parse(process.argv);
