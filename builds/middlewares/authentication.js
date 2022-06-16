"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticateTokenSeller = exports.authenticateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authenticateToken(req, res, next) {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];
    if (token == null) {
        return res.status(400);
    }
    try {
        const { username } = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.body.username = username;
    }
    catch (_a) {
        res.send(404).redirect("/login");
    }
    next();
}
exports.authenticateToken = authenticateToken;
function authenticateTokenSeller(req, res, next) {
    const authHeaders = req.headers["authorization"];
    const token = authHeaders && authHeaders.split(" ")[1];
    if (token == null) {
        return res.status(400);
    }
    try {
        const { username } = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.body.seller = username;
    }
    catch (_a) {
        res.send(404).redirect("/login");
    }
    next();
}
exports.authenticateTokenSeller = authenticateTokenSeller;
