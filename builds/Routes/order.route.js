"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_controller_1 = require("../controllers/order.controller");
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const router = express_1.default.Router();
router.get("/:username", order_controller_1.findOrderByUsername);
exports.default = express_2.Router;
