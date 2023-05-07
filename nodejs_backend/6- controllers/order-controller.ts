import express, { NextFunction, Request, Response } from "express";
import  orderLogic from "../5- logic/order-logic"
import router from "./market-controller";
import OrderPostModel from "../4- models/OrderPost-model";
import cyber from "../2- utils/cyber";

router.post("/create_order",async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const order = new OrderPostModel(req.body);
        const decodeUser: User = await cyber.getDecodeToken(req);
        order.userID = decodeUser.userID;
    
    const newOrder =await orderLogic.insertOrder(order)
    res.json(newOrder);
    
    }catch(error){
        next(error)
    }
})

export default router;

