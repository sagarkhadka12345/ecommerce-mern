"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
exports.UserModel = exports.User = exports.loginBodySchema = exports.registerUserSchema = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const unique_username_generator_1 = require("unique-username-generator");
const zod_1 = require("zod");
const bcrypt = __importStar(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
exports.registerUserSchema = {
    body: (0, zod_1.object)({
        firstname: (0, zod_1.string)({
            required_error: "firstname is required"
        }),
        lastname: (0, zod_1.string)({
            required_error: "lastname is required"
        }),
        username: (0, zod_1.string)(),
        email: (0, zod_1.string)({
            required_error: "email is required "
        }).email("Please Enter Valid Email"),
        password: (0, zod_1.string)({
            required_error: "Password is required"
        }).min(8, "password must be atleast 8 characters").max(64, "password cannot be more than 64 charatcers"),
        confirmPassword: (0, zod_1.string)({
            required_error: "confirm Password is required"
        }),
        address: (0, zod_1.string)({
            required_error: "address must be provided"
        })
    })
};
exports.loginBodySchema = {
    body: (0, zod_1.object)({
        username: (0, zod_1.string)({
            required_error: "Username is required"
        }),
        password: (0, zod_1.string)({
            required_error: "Password is required"
        })
            .min(8, "password cannot be lower than 8 charactes")
            .max(64, "password cannot be more than 64 characters")
    })
};
let User = class User {
    comparePassword(password) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt.compare(password, this.password);
        });
    }
    compareToken(token) {
        return (token === this.resetPassword);
    }
};
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "firstname", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "lastname", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, default: (0, unique_username_generator_1.generateUsername)(), unique: true }),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "address", void 0);
__decorate([
    (0, typegoose_1.prop)({ default: crypto_1.default.randomBytes(12).toString('hex') }),
    __metadata("design:type", String)
], User.prototype, "resetPassword", void 0);
User = __decorate([
    (0, typegoose_1.pre)("save", function (next) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.isModified("password") || this.isNew) {
                const hash = yield bcrypt.hash(this.password, 10);
                this.password = hash;
                return next();
            }
        });
    })
], User);
exports.User = User;
exports.UserModel = (0, typegoose_1.getModelForClass)(User, {
    schemaOptions: {
        timestamps: true
    }
});
