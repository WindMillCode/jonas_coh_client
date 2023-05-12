import express, { NextFunction, Request, Response } from "express";
import marketLogic from "../5- logic/market-logic";
var router = require('express').Router();


router.get("/",async (req: Request, res: Response, next: NextFunction)=>{
    try{
        const result = await marketLogic.getStoreInformation()
        res.json(result)
    }catch(error){
        next(error)
    }
})

let marketController =router;
export default marketController
