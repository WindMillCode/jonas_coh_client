import express, { NextFunction, Request, Response } from "express";
import  orderLogic from "../5- logic/order-logic"

import OrderPostModel from "../4- models/OrderPost-model";
import cyber from "../2- utils/cyber";
import UserModel from "../4- models/user-model";
var router = require('express').Router();

router.post("/create_order",async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const order = new OrderPostModel(req.body);
        const decodeUser: UserModel= await cyber.getDecodeToken(req as any);
        order.userID = decodeUser.userID;

    const newOrder =await orderLogic.insertOrder(order)
    res.json(newOrder);

    }catch(error){
        next(error)
    }
})
let orderController = router
export default orderController;


