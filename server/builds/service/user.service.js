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
exports.addItems = exports.addItemsService = exports.resetPasswordService = exports.forgotPasswordService = exports.changePasswordService = exports.findUserService = void 0;
const user_model_1 = require("../Models/user.model");
const bcrypt_1 = __importDefault(require("bcrypt"));
const item_model_1 = require("../Models/item.model");
function findUserService(username) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_model_1.UserModel.findOne({
            username
        });
    });
}
exports.findUserService = findUserService;
function changePasswordService(username, password, newPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_model_1.UserModel.updateOne({
            username
        }, {
            $set: {
                password: yield bcrypt_1.default.hash(newPassword, 10)
            }
        });
    });
}
exports.changePasswordService = changePasswordService;
function forgotPasswordService(username, token) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_model_1.UserModel.updateOne({
            username
        }, {
            $set: {
                resetPassword: token
            }
        });
    });
}
exports.forgotPasswordService = forgotPasswordService;
function resetPasswordService(username, newToken, password) {
    return __awaiter(this, void 0, void 0, function* () {
        return user_model_1.UserModel.updateOne({
            username
        }, {
            $set: {
                password: password,
                resetPassword: newToken
            }
        });
    });
}
exports.resetPasswordService = resetPasswordService;
const addItemsService = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { itemId } = req.body;
    const item = yield addItems(itemId);
    return res.status(200).send(item);
});
exports.addItemsService = addItemsService;
function addItems(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield item_model_1.ItemModel.insertMany(data);
    });
}
exports.addItems = addItems;
