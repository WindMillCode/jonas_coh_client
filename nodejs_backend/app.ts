import express from "express";
import cors from "cors";
const path = require("path")
import loginFilter from "./helper/loginfilter"
import errorHandler from "./errors/error-handler";
import productControllerr from "./controllers/products-controller";
import userController from("./controllers/users-controler";
import marketController from"./controllers/market-controller";
import cartController from "./controllers/cart-controller";
import orderController from "./controllers/order-controller";
import expressFileUpload from 'express-fileupload'
const server = express();

server.use(express.json())
server.use(cors())

server.use(expressFileUpload());
server.use("/images",express.static("./images"))
server.use(loginFilter())
server.use("/market",marketController)
server.use("/users",userController)
server.use("/products",productControllerr)
server.use("/cart",cartController)
server.use("/order",orderController)
server.use(errorHandler)

server.listen(3006,()=>console.log("http://localhost:3006/users/"))

