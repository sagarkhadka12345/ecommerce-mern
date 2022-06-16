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
exports.findItemsByType = exports.findItemsBySeller = exports.findItem = exports.findAllItems = exports.createItemHandler = void 0;
const item_model_1 = require("../Models/item.model");
const mongoose_1 = __importDefault(require("mongoose"));
const item_service_1 = require("../service/item.service");
const item_service_2 = require("../service/item.service");
const createItemHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //  const {seller}=req.body.seller;
    const { seller, name, price, type, img } = req.body;
    const Item = yield item_model_1.ItemModel.create({
        _id: new mongoose_1.default.Types.ObjectId(),
        seller, name, price, type, img
    });
    return Item.save().then((Item) => {
        res.status(200).send(Item);
    })
        .catch((err) => {
        res.status(500).send(err);
    });
});
exports.createItemHandler = createItemHandler;
// export const createItemHandler = async (req: Request, res: Response) => {
//     const {sellerId}= req.body.username
//     const { name,price, type, productId, img} = req.body
//     const Item = await ItemModel.create({
//         _id: new mongoose.Types.ObjectId(),
//         name, sellerId,price,type, productId,img
//     })
//     return Item.save()
//         .then(() => {
//             res.send(req.body)
//         })
//         .catch((err: any) => {
//             if (err.code === 1000) {
//                 return res.send("Item already created")
//             }
//             return res.send(err.message).status(200)
//         })
// }
const findAllItems = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield item_model_1.ItemModel.find();
    return res.status(200).send(item);
});
exports.findAllItems = findAllItems;
const findItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemId } = req.params;
    const item = yield item_model_1.ItemModel.find({
        _id: itemId
    });
    return res.status(200).send(item);
});
exports.findItem = findItem;
const findItemsBySeller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { seller } = req.params;
    const item = yield (0, item_service_1.findItemsBySellerService)(seller);
    return res.status(200).send(item);
});
exports.findItemsBySeller = findItemsBySeller;
const findItemsByType = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { typeId } = req.params;
    const item = yield (0, item_service_2.findItemsByTypeService)(typeId);
    return res.status(200).send(item);
});
exports.findItemsByType = findItemsByType;
