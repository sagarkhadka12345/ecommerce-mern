import {db} from './DataBase/dataBase';
import express, { Request, Response, NextFunction } from "express";
import config from "./config/config";
import logger from "./logger/logger";
import { createItemHandler , findAllItems} from "../server/controllers/item.controller"
import { createCartHandler, updateCartHandler , findCart, removeItemHandler, emptyCartHandler } from './controllers/cart.controller';
import { createUserHandler , findAllUsers, loginUser, changePassword, forgotPassword, resetPassword, findUser } from './controllers/user.controller';
import {findItem} from "../server/controllers/item.controller"
import { findItemsBySeller } from "./controllers/item.controller"
import { findItemsByType } from "./controllers/item.controller";
import { findOrderByUsername, createOrderHandler, pushItems} from './controllers/order.controller';
import cors from "cors";
import jwt from "jsonwebtoken"
import { authenticateToken, authenticateTokenSeller } from './middlewares/authentication';
import { loginBodySchema, registerUserSchema } from './Models/user.model';
import {processRequestBody} from "zod-express-middleware";



db;
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors({
  origin:"*"
}))

app.listen(config.server.port, () => {
  logger.info(`Listening to port ${config.server.port} `)
  

})
app.use((req: Request, res: Response, next: NextFunction) => {
  logger.info(
    `Incoming-> Method: [ ${req.method}] url:[${req.url}] IP: [${req.socket.remoteAddress}]`
  );

  res.on("finish", () => {
    logger.info(
      `Incoming-> Method: [ ${req.method}] url:[${req.url}] IP: [${req.socket.remoteAddress}]  status:[${res.status}]`
    );
  });
  next();
})
//health check
app.get("/ping", (req: Request, res: Response) => {
  res.send("OK").status(200)
  logger.info("api is Healthy")

})


app.post("/cart/createCart", createCartHandler)
app.post("/cart/emptyCart",authenticateToken, emptyCartHandler)
app.get("/cart/findCart",authenticateToken,findCart)
app.post("/cart/update",authenticateToken, updateCartHandler)
app.post("/cart/remove",authenticateToken, removeItemHandler)
app.get("/item/findAll", findAllItems)
app.get("/item/find/:itemId", findItem )
app.get("/item/type/:typeId", findItemsByType)
app.get("/item/seller/:seller", findItemsBySeller)
app.post("/item/createItem",authenticateTokenSeller, createItemHandler)
app.post("/order/createOrder",authenticateToken, createOrderHandler);
app.get("/order/find/:username", findOrderByUsername);
app.post("/user/createUser",processRequestBody(registerUserSchema.body), createUserHandler)
app.get("/user/findAllUsers", findAllUsers)
app.get("/user/findUser",authenticateToken, findUser)
app.post("/user/login",processRequestBody(loginBodySchema.body), loginUser)
app.post("/user/changePassword=", authenticateToken, changePassword)
app.post("/user/forgotPassword", forgotPassword)
app.post("/user/resetPassword", resetPassword)
app.post("/order/pushItems",authenticateToken, pushItems)
app.post("/order/createOrder", authenticateToken, createOrderHandler)











