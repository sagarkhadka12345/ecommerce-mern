"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const item_controller_1 = require("../controllers/item.controller");
const express_1 = __importDefault(require("express"));
const express_2 = require("express");
const router = express_1.default.Router();
router.get("/:itemId", item_controller_1.findItem);
router.get("/findAll", item_controller_1.findAllItems);
router.get("/type/:typeId", item_controller_1.findItemsByType);
router.get("/seller/:sellerId", item_controller_1.findItemsBySeller);
router.post("/createItem", item_controller_1.createItemHandler);
exports.default = express_2.Router;
