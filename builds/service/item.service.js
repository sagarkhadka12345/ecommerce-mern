"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findItemsByTypeService = exports.findItemsBySellerService = void 0;
const item_model_1 = require("../Models/item.model");
function findItemsBySellerService(seller) {
    return item_model_1.ItemModel.find({
        seller
    });
}
exports.findItemsBySellerService = findItemsBySellerService;
function findItemsByTypeService(type) {
    return item_model_1.ItemModel.find({
        type
    });
}
exports.findItemsByTypeService = findItemsByTypeService;
