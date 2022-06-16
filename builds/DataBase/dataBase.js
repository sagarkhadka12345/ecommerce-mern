"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../config/config"));
const logger_1 = __importDefault(require("../logger/logger"));
const localhost = "mongodb://127.0.0.1/ecommerce";
exports.db = mongoose_1.default.connect(config_1.default.mongo.url, { retryWrites: true, w: "majority" }).then(() => {
    logger_1.default.info("connected to DataBase");
}).catch((err) => {
    logger_1.default.error(err);
});
