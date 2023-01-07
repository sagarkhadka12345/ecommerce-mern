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
const dataBase_1 = require("./DataBase/dataBase");
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config/config"));
const logger_1 = __importDefault(require("./logger/logger"));
const item_controller_1 = require("./controllers/item.controller");
const cart_controller_1 = require("./controllers/cart.controller");
const user_controller_1 = require("./controllers/user.controller");
const item_controller_2 = require("./controllers/item.controller");
const item_controller_3 = require("./controllers/item.controller");
const item_controller_4 = require("./controllers/item.controller");
const order_controller_1 = require("./controllers/order.controller");
const cors_1 = __importDefault(require("cors"));
const authentication_1 = require("./middlewares/authentication");
const user_model_1 = require("./Models/user.model");
const zod_express_middleware_1 = require("zod-express-middleware");
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const Stripe = require("stripe");
const stripe = Stripe("sk_test_51MA1w7G9ZwN3X5brgRNkQLV1F6sgvTMVrpoMYUvElldIGToP1115fat1mITTFqIn2PMc3LK3V3Z9D4vvwBICokM000S3vgT2YU");
dataBase_1.db;
const app = (0, express_1.default)();
const pricesa = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = yield stripe.products.create({
            name: "Basic Dashboard",
            default_price_data: {
                unit_amount: 1000,
                currency: "usd",
                recurring: { interval: "month" },
            },
            expand: ["default_price"],
        });
        console.log(product);
    }
    catch (error) { }
});
pricesa();
const endpointSecret = "whsec_ed282d6b3d8b224c33fe3e98888caa30bff51adbce6f5d1f944dda09c2bc11f3";
app.post("/webhook", express_1.default.raw({ type: "application/json" }), (request, response) => {
    const sig = request.headers["stripe-signature"];
    let event;
    try {
        event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    }
    catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }
    // Handle the event
    switch (event.type) {
        case "payment_intent.succeeded":
            const paymentIntent = event.data.object;
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }
    // Return a 200 response to acknowledge receipt of the event
    response.send();
});
app.use(body_parser_1.default.json({ limit: "50mb" }));
app.use(body_parser_1.default.urlencoded({ limit: "50mb", extended: true }));
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: "*",
}));
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
app.post("stripe", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const session = yield stripe.checkout.sessions.create({});
    }
    catch (error) { }
}));
app.use("/api/v1/image/item", express_1.default.static("./Assets/Item/"));
app.post("/api/cart/createCart", cart_controller_1.createCartHandler);
app.post("/api/cart/emptyCart", authentication_1.authenticateToken, cart_controller_1.emptyCartHandler);
app.get("/api/cart/findCart", authentication_1.authenticateToken, cart_controller_1.findCart);
app.post("/api/cart/update", authentication_1.authenticateToken, cart_controller_1.updateCartHandler);
app.post("/api/cart/remove", authentication_1.authenticateToken, cart_controller_1.removeItemHandler);
app.get("/api/item/findAll", item_controller_1.findAllItems);
app.get("/api/item/find/:itemId", item_controller_2.findItem);
app.delete("/api/item/delete/:itemId", item_controller_1.deleteItemhandler);
app.get("/api/item/type/:typeId", item_controller_4.findItemsByType);
app.get("/api/item/seller/:seller", item_controller_3.findItemsBySeller);
const storage = multer_1.default.diskStorage({
    destination: "./Assets/Item/",
    filename(req, file, callback) {
        let filename = file.fieldname +
            Date.now() +
            Math.trunc(Math.random() * 100000) +
            "." +
            file.originalname.split(".")[file.originalname.split(".").length - 1];
        callback(null, filename);
    },
});
const uploadItemPicture = (0, multer_1.default)({
    storage: storage,
});
app.post("/api/item/createItem", uploadItemPicture.single("itemImage"), authentication_1.authenticateTokenSeller, item_controller_1.createItemHandler);
app.post("/api/order/createOrder", authentication_1.authenticateToken, order_controller_1.createOrderHandler);
app.get("/api/order/find/:username", order_controller_1.findOrderByUsername);
app.post("/api/user/createUser", (0, zod_express_middleware_1.processRequestBody)(user_model_1.registerUserSchema.body), user_controller_1.createUserHandler);
app.get("/api/user/findAllUsers", user_controller_1.findAllUsers);
app.get("/api/user/findUser", authentication_1.authenticateToken, user_controller_1.findUser);
app.post("/api/user/login", (0, zod_express_middleware_1.processRequestBody)(user_model_1.loginBodySchema.body), user_controller_1.loginUser);
app.post("/api/user/changePassword=", authentication_1.authenticateToken, user_controller_1.changePassword);
app.post("/api/user/forgotPassword", user_controller_1.forgotPassword);
app.post("/api/user/resetPassword", user_controller_1.resetPassword);
app.post("/api/order/pushItems", authentication_1.authenticateToken, order_controller_1.pushItems);
app.post("/api/order/createOrder", authentication_1.authenticateToken, order_controller_1.createOrderHandler);
app.get("/api/order/getAllOrders", order_controller_1.getAllOrders);
app.delete("/api/order/deleteOrder/:orderId", order_controller_1.deleteOrder);
app.use(express_1.default.static("build"));
app.use("*", (req, res) => {
    res.sendFile(path_1.default.resolve(__dirname, "build", "index.html"));
});
app.use("*", (req, res) => {
    return res.send("The Page isn't available in the website");
});
