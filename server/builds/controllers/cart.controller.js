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
exports.removeItemHandler = exports.findCart = exports.emptyCartHandler = exports.createCartHandler = exports.updateCartHandler = exports.findAll = void 0;
const cart_model_1 = require("../Models/cart.model");
// import { findCartsBySeller } from "../service/user.service";
// import { findCarts } from "../service/user.service";
const mongoose_1 = __importDefault(require("mongoose"));
const cart_service_1 = require("../service/cart.service");
function findAll(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const Cart = yield cart_model_1.CartModel.find();
        return res.send(Cart).status(200);
    });
}
exports.findAll = findAll;
const updateCartHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, item } = req.body;
    const carts = yield (0, cart_service_1.updateCartService)(username, item);
    return res.send(carts).status(200);
});
exports.updateCartHandler = updateCartHandler;
const createCartHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, totalQty, totalPrice, items } = req.body;
    const Cart = yield cart_model_1.CartModel.create({
        _id: new mongoose_1.default.Types.ObjectId(),
        username,
        items,
        totalQty,
        totalPrice
    });
    return Cart.save()
        .catch((err) => {
        res.status(500).send(err);
    });
});
exports.createCartHandler = createCartHandler;
const emptyCartHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    const cart = yield (0, cart_service_1.emptyCartService)(username);
    return res.status(200).send("Cart deleted successful");
});
exports.emptyCartHandler = emptyCartHandler;
const findCart = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    const Carts = yield (0, cart_service_1.findCartService)(username);
    return res.send(Carts).status(200);
});
exports.findCart = findCart;
const removeItemHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId, username } = req.body;
    const cart = yield (0, cart_service_1.findCartService)(username);
    if (cart) {
        const carts = yield (0, cart_service_1.removeItemService)(username, productId);
        return res.send(carts).status(200);
    }
    res.send(500);
});
exports.removeItemHandler = removeItemHandler;
// export const deleteItemHandler= async(req:Request, res:Response)=>{
//   const {username}= req.body;
//   const cart = await findCartService(username);
//   const carts = CartModel.updateOne({
//     username
//   },{
//     $pull:{
//     }
//   })
// }
