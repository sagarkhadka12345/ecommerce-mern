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
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrderServiceByUsername = exports.pushItemsService = void 0;
const order_model_1 = require("../Models/order.model");
function pushItemsService(username, item) {
    return __awaiter(this, void 0, void 0, function* () {
        const order = yield order_model_1.OrderModel.findOneAndUpdate({
            username: username,
        }, {
            $push: {
                items: item,
            },
        });
        return order;
    });
}
exports.pushItemsService = pushItemsService;
function findOrderServiceByUsername(username) {
    return order_model_1.OrderModel.find({
        username,
    });
}
exports.findOrderServiceByUsername = findOrderServiceByUsername;
