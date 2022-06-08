import { createCartHandler, deleteCartHandler, updateCartHandler } from "../controllers/cart.controller";
import express, {Router} from "express";


const router = express.Router()

router.post("/createCart", createCartHandler)
router.delete("/deleteCart", deleteCartHandler)
router.patch("/:username", updateCartHandler)


export default Router;