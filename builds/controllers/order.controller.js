"use strict";
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
exports.pushItems = exports.findOrderByUsername = exports.createOrderHandler = void 0;
const order_model_1 = require("../Models/order.model");
const mongoose_1 = __importDefault(require("mongoose"));
const order_service_1 = require("../service/order.service");
const createOrderHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, items, totalPrice } = req.body;
    const Cart = yield order_model_1.OrderModel.create({
        _id: new mongoose_1.default.Types.ObjectId(),
        username,
        items,
        totalPrice
    });
    return Cart.save().then((Cart) => {
        res.status(200);
    })
        .catch((err) => {
        res.status(500).send(err);
    });
});
exports.createOrderHandler = createOrderHandler;
const findOrderByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.params;
    const orders = yield (0, order_service_1.findOrderServiceByUsername)(username);
    return res.send(orders).status(200);
});
exports.findOrderByUsername = findOrderByUsername;
const pushItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, item } = req.body;
    const order = (0, order_service_1.pushItemsService)(username, item);
    return res.send(order);
});
exports.pushItems = pushItems;
