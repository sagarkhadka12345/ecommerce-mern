"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.findUser = exports.resetPassword = exports.forgotPassword = exports.changePassword = exports.findAllUsers = exports.loginUser = exports.createUserHandler = void 0;
const user_model_1 = require("../Models/user.model");
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt = __importStar(require("bcrypt"));
const user_service_1 = require("../service/user.service");
const crypto_1 = __importDefault(require("crypto"));
const mailer_1 = require("../helpers/mailer");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config/config"));
dotenv_1.default.config();
const createUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstname, lastname, email, password, username, address } = req.body;
    const user = yield user_model_1.UserModel.create({
        _id: new mongoose_1.default.Types.ObjectId(),
        email,
        password,
        username,
        address,
        firstname,
        lastname,
    });
    return user
        .save()
        .then(() => {
        const token = jsonwebtoken_1.default.sign({ username: username }, config_1.default.access.secret);
        return res.status(200).send(token);
    })
        .catch((err) => {
        console.log(err);
        if (err.code === 11000) {
            return res.send("User already created");
        }
        return res.send(err.message).status(200);
    });
});
exports.createUserHandler = createUserHandler;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    console.log("====================================");
    console.log(req.body);
    console.log("====================================");
    const user = yield (0, user_service_1.findUserService)(username);
    console.log("====================================");
    console.log(user);
    console.log("====================================");
    if (user &&
        Object.entries(user).length !== 0 &&
        (yield user.comparePassword(password))) {
        const token = jsonwebtoken_1.default.sign({ username: username }, config_1.default.access.secret);
        return res.status(200).send(token);
    }
    return res.status(500).send("Invalid email or password");
});
exports.loginUser = loginUser;
const findAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const item = yield user_model_1.UserModel.find();
    return res.status(200).send(item);
});
exports.findAllUsers = findAllUsers;
const changePassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, newPassword } = req.body;
    const user = yield (0, user_service_1.findUserService)(username);
    if (user && (yield user.comparePassword(password))) {
        yield (0, user_service_1.changePasswordService)(username, password, newPassword);
        return res.status(200).send(user);
    }
    return res.status(500).send("Invalid email or password");
});
exports.changePassword = changePassword;
const forgotPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body;
    const user = yield user_model_1.UserModel.findOne({ username });
    if (!user) {
        return res.send("User doesn't exist");
    }
    const token = crypto_1.default.randomBytes(12).toString("hex");
    const update = yield user_model_1.UserModel.updateOne({
        username,
    }, {
        $set: {
            resetPassword: token,
        },
    });
    yield (0, mailer_1.sendMail)({
        from: "sagar.khadka2001@mail.com",
        to: "sagar.khadka2001@gmail.com",
        subject: "Forgot Password",
        html: `<a href='${token}'<button>Reset Password</button>`,
    });
    return res.status(200).send(token);
});
exports.forgotPassword = forgotPassword;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, token } = req.body;
    const user = yield (0, user_service_1.findUserService)(username);
    const newToken = crypto_1.default.randomBytes(12).toString("hex");
    const hash = yield bcrypt.hash(password, 10);
    if (user && user.compareToken(token)) {
        yield (0, user_service_1.resetPasswordService)(username, newToken, hash);
        return res.status(200).redirect("http://localhost:3001");
    }
    return res.status(404).send("user not found");
});
exports.resetPassword = resetPassword;
const findUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username } = req.body.username;
    try {
        const result = yield (0, user_service_1.findUserService)(username);
        res.send(req.body).status(200);
    }
    catch (error) {
        res.status(400).send(error);
    }
});
exports.findUser = findUser;
