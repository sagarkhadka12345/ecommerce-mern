"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwt_secret = process.env.ACCESS_TOKEN_SECRET || "";
const SERVER_PORT = process.env.PORT || 9494;
const MONGO_USERNAME = process.env.MONGO_USERNAME || "";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "";
const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@cluster0.rsh6s.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const config = {
    mongo: {
        url: MONGO_URL,
        password: MONGO_PASSWORD,
    },
    server: {
        port: SERVER_PORT,
    },
    access: {
        secret: jwt_secret,
    },
    mail: {
        user: process.env.USER,
        pass: process.env.PASS,
    },
};
exports.default = config;
