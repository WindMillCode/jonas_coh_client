const express = require('express');

import cors from "cors";
const path = require("path")
import loginFilter from "./helper/loginfilter"
import errorHandler from "./errors/error-handler";

import cartController from "./6- controllers/cart-controller";
import marketController from "./6- controllers/market-controller";
import userController from "./6- controllers/users-controler";
import productController from "./6- controllers/products-controller";
import orderController from "./6- controllers/order-controller";
const server = express();
export let router = server

server.use(express.json())
server.use(cors())


server.use("/images",express.static("./images"))
server.use(loginFilter())
server.use("/market",marketController)
server.use("/users",userController)
server.use("/products",productController)
server.use("/cart",cartController)
server.use("/order",orderController)
server.use(errorHandler)

server.listen(3006,()=>console.log("http://localhost:3006/users/"))

