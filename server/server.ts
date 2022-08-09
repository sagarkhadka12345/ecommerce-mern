import {db} from './DataBase/dataBase';
import express, { Request, Response, NextFunction } from "express";
import config from "./config/config";
import logger from "./logger/logger";
import { createItemHandler , findAllItems} from "./controllers/item.controller"
import { createCartHandler, updateCartHandler , findCart, removeItemHandler, emptyCartHandler } from './controllers/cart.controller';
import { createUserHandler , findAllUsers, loginUser, changePassword, forgotPassword, resetPassword, findUser } from './controllers/user.controller';
import {findItem} from "./controllers/item.controller"
import { findItemsBySeller } from "./controllers/item.controller"
import { findItemsByType } from "./controllers/item.controller";
import { findOrderByUsername, createOrderHandler, pushItems} from './controllers/order.controller';
import cors from "cors";
import jwt from "jsonwebtoken"
import { authenticateToken, authenticateTokenSeller } from './middlewares/authentication';
import { loginBodySchema, registerUserSchema } from './Models/user.model';
import {processRequestBody} from "zod-express-middleware";
import { newItemSchema } from './Models/item.model';
import path from "path"
import bodyParser from 'body-parser';


db;
const app = express()

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

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


app.post("/api/cart/createCart", createCartHandler)
app.post("/api/cart/emptyCart",authenticateToken, emptyCartHandler)
app.get("/api/cart/findCart",authenticateToken,findCart)
app.post("/api/cart/update",authenticateToken, updateCartHandler)
app.post("/api/cart/remove",authenticateToken, removeItemHandler)
app.get("/api/item/findAll", findAllItems)
app.get("/api/item/find/:itemId", findItem )
app.get("/api/item/type/:typeId", findItemsByType)
app.get("/api/item/seller/:seller", findItemsBySeller)
app.post("/api/item/createItem",authenticateTokenSeller, processRequestBody(newItemSchema.body), createItemHandler)
app.post("/api/order/createOrder",authenticateToken, createOrderHandler);
app.get("/api/order/find/:username", findOrderByUsername);
app.post("/api/user/createUser",processRequestBody(registerUserSchema.body), createUserHandler)
app.get("/api/user/findAllUsers", findAllUsers)
app.get("/api/user/findUser",authenticateToken, findUser)
app.post("/api/user/login",processRequestBody(loginBodySchema.body), loginUser)
app.post("/api/user/changePassword=", authenticateToken, changePassword)
app.post("/api/user/forgotPassword", forgotPassword)
app.post("/api/user/resetPassword", resetPassword)
app.post("/api/order/pushItems",authenticateToken, pushItems)
app.post("/api/order/createOrder", authenticateToken, createOrderHandler)

app.use(express.static("build"));
  app.use("*", (req:Request, res:Response)=>{
    res.sendFile(path.resolve(__dirname, "build","index.html"))
  })


app.use("*", (req:Request, res:Response)=>{
  return res.send("The Page isn't available in the website")
})








