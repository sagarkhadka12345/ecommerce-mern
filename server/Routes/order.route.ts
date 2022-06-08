import { orderHandler, findOrderByUsername } from "../controllers/order.controller";
import express from "express";
import { Router } from "express";

const router = express.Router();
router.post("/", orderHandler);

router.get("/:username", findOrderByUsername);



export default Router;




