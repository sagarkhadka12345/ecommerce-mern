"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemModel = exports.Item = exports.newItemSchema = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const crypto_1 = __importDefault(require("crypto"));
const zod_1 = require("zod");
exports.newItemSchema = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "The item must have name "
        }),
        seller: (0, zod_1.string)({
            required_error: "Seller name must be defined"
        }),
        price: (0, zod_1.number)({
            required_error: "Price must be defined",
            invalid_type_error: "Price must be in number"
        }),
        type: (0, zod_1.string)({
            required_error: "Type must be defined"
        }),
        img: (0, zod_1.string)({
            required_error: 'Image must be defined'
        })
    }).strict()
};
class Item {
}
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Item.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: crypto_1.default.randomBytes(12).toString('hex') }),
    __metadata("design:type", String)
], Item.prototype, "productId", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: "unknown" }),
    __metadata("design:type", String)
], Item.prototype, "seller", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Number)
], Item.prototype, "price", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Item.prototype, "type", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: "img" }),
    __metadata("design:type", String)
], Item.prototype, "img", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: 0 }),
    __metadata("design:type", Number)
], Item.prototype, "quantity", void 0);
exports.Item = Item;
exports.ItemModel = (0, typegoose_1.getModelForClass)(Item);
