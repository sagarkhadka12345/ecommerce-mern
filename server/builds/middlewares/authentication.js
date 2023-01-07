"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateTokenSeller = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
function authenticateToken(req, res, next) {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];
    if (token == null) {
        return res.status(400);
    }
    try {
        const { username } = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.body.username = username;
        next();
    }
    catch (_a) {
        return res.send(404).redirect("/login");
    }
}
exports.authenticateToken = authenticateToken;
function authenticateTokenSeller(req, res, next) {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];
    if (token == null) {
        return res.status(400);
    }
    try {
        const { username } = jsonwebtoken_1.default.verify(token, config_1.default.access.secret);
        req.body.seller = username;
        next();
    }
    catch (_a) {
        return res.status(406).send("Please login or register");
    }
}
exports.authenticateTokenSeller = authenticateTokenSeller;
