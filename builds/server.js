"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dataBase_1 = require("./DataBase/dataBase");
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const logger_1 = __importDefault(require("./logger/logger"));
const item_controller_1 = require("../server/controllers/item.controller");
const cart_controller_1 = require("./controllers/cart.controller");
const user_controller_1 = require("./controllers/user.controller");
const item_controller_2 = require("../server/controllers/item.controller");
const item_controller_3 = require("./controllers/item.controller");
const item_controller_4 = require("./controllers/item.controller");
const order_controller_1 = require("./controllers/order.controller");
const authentication_1 = require("./middlewares/authentication");
const user_model_1 = require("./Models/user.model");
const zod_express_middleware_1 = require("zod-express-middleware");
const item_model_1 = require("./Models/item.model");
const path_1 = __importDefault(require("path"));
dataBase_1.db;
const app = (0, express_1.default)();
const bodyParser = require('body-parser');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.json());
// app.use(cors({
//   origin:"*"
// }))
app.use(express_1.default.static("build"));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "build", "index.html"));
});
app.listen(config_1.default.server.port, () => {
    logger_1.default.info(`Listening to port ${config_1.default.server.port} `);
});
app.use((req, res, next) => {
    logger_1.default.info(`Incoming-> Method: [ ${req.method}] url:[${req.url}] IP: [${req.socket.remoteAddress}]`);
    res.on("finish", () => {
        logger_1.default.info(`Incoming-> Method: [ ${req.method}] url:[${req.url}] IP: [${req.socket.remoteAddress}]  status:[${res.status}]`);
    });
    next();
});
//health check
app.get("/ping", (req, res) => {
    res.send("OK").status(200);
    logger_1.default.info("api is Healthy");
});
app.post("/cart/createCart", cart_controller_1.createCartHandler);
app.post("/cart/emptyCart", authentication_1.authenticateToken, cart_controller_1.emptyCartHandler);
app.get("/cart/findCart", authentication_1.authenticateToken, cart_controller_1.findCart);
app.post("/cart/update", authentication_1.authenticateToken, cart_controller_1.updateCartHandler);
app.post("/cart/remove", authentication_1.authenticateToken, cart_controller_1.removeItemHandler);
app.get("/item/findAll", item_controller_1.findAllItems);
app.get("/item/find/:itemId", item_controller_2.findItem);
app.get("/item/type/:typeId", item_controller_4.findItemsByType);
app.get("/item/seller/:seller", item_controller_3.findItemsBySeller);
app.post("/item/createItem", authentication_1.authenticateTokenSeller, (0, zod_express_middleware_1.processRequestBody)(item_model_1.newItemSchema.body), item_controller_1.createItemHandler);
app.post("/order/createOrder", authentication_1.authenticateToken, order_controller_1.createOrderHandler);
app.get("/order/find/:username", order_controller_1.findOrderByUsername);
app.post("/user/createUser", (0, zod_express_middleware_1.processRequestBody)(user_model_1.registerUserSchema.body), user_controller_1.createUserHandler);
app.get("/user/findAllUsers", user_controller_1.findAllUsers);
app.get("/user/findUser", authentication_1.authenticateToken, user_controller_1.findUser);
app.post("/user/login", (0, zod_express_middleware_1.processRequestBody)(user_model_1.loginBodySchema.body), user_controller_1.loginUser);
app.post("/user/changePassword=", authentication_1.authenticateToken, user_controller_1.changePassword);
app.post("/user/forgotPassword", user_controller_1.forgotPassword);
app.post("/user/resetPassword", user_controller_1.resetPassword);
app.post("/order/pushItems", authentication_1.authenticateToken, order_controller_1.pushItems);
app.post("/order/createOrder", authentication_1.authenticateToken, order_controller_1.createOrderHandler);
app.use("*", (req, res) => {
    return res.send("The Page isn't available in the website");
});
