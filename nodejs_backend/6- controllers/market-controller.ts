import express, { NextFunction, Request, Response } from "express";
import marketLogic from "../5- logic/market-logic";
import router from "./cart-controller";

router.get("/",async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const result = await marketLogic.getStoreInformation()
        res.json(result)
    }catch(error){
        next(error)
    }
})

export default router;