import {db} from './DataBase/dataBase';
import express, { Request, Response, NextFunction } from "express";
import config from "./config/config";
import logger from "./logger/logger";
import { createItemHandler , findAllItems} from "../server/controllers/item.controller"
import { createCartHandler, updateCartHandler , deleteCartHandler, findCart } from './controllers/cart.controller';
import { createUserHandler , findAllUsers, loginUser, changePassword } from './controllers/user.controller';
import {findItem} from "../server/controllers/item.controller"
import { findItemsBySeller } from "./controllers/item.controller"
import { findItemsByType } from "./controllers/item.controller";
import { findOrderByUsername, orderHandler} from './controllers/order.controller';
import cors from "cors";
import jwt from "jsonwebtoken"
import { authenticateToken } from './middlewares/authentication';
import { loginBodySchema, registerUserSchema } from './Models/user.model';
import {processRequestBody} from "zod-express-middleware";

db;
const app = express()
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
app.post("/cart/deleteCart/:username", deleteCartHandler)
app.get("/cart/findCart/:username", findCart)
app.post("/cart/update/:username", updateCartHandler)
app.get("/item/findAll", findAllItems)
app.get("/item/find/:itemId", findItem )
app.get("/item/type/:typeId", findItemsByType)
app.get("/item/seller/:sellerId", findItemsBySeller)
app.post("/item/createItem", createItemHandler)
app.post("/order/createOrder/:username", orderHandler);
app.get("/order/find/:username",authenticateToken, findOrderByUsername);
app.post("/user/createUser",processRequestBody(registerUserSchema.body), createUserHandler)
app.get("/user/findAllUsers", findAllUsers)
app.post("/user/login",processRequestBody(loginBodySchema.body), loginUser)
app.post("/user/changePassword/:username", changePassword)







