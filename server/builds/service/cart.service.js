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
exports.removeItemService = exports.emptyCartService = exports.findCartService = exports.updateCartService = void 0;
const cart_model_1 = require("../Models/cart.model");
function updateCartService(username, item) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield cart_model_1.CartModel.updateOne({
            username
        }, {
            $push: {
                items: item
            }
        });
    });
}
exports.updateCartService = updateCartService;
function findCartService(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield cart_model_1.CartModel.find({
            username
        });
    });
}
exports.findCartService = findCartService;
function emptyCartService(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield cart_model_1.CartModel.updateOne({
            username
        }, {
            $set: {
                items: []
            }
        });
    });
}
exports.emptyCartService = emptyCartService;
function removeItemService(username, productId) {
    return cart_model_1.CartModel.updateOne({
        username
    }, {
        $pull: {
            items: { productId: productId }
        }
    });
}
exports.removeItemService = removeItemService;
