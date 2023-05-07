import express, { NextFunction, Request, Response } from "express";
import userLogic from "../5- logic/user-logic";
import router from "./order-controller";
import cacheModule from "../5- logic/cache-module";
import UserModel from "../4- models/user-model";
import RoleModel from "../4- models/role-model";
const ValidateUser = require("../validator/validatorUser");

//register route

router.post("/register/firstStep", async (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.image = req.files?.image;
   
    const user = new UserModel(req.body);

    user.role = RoleModel.user;
        console.log(user);
        
    const token = await userLogic.userRegisterFirstStep(user);
    res.status(201).json(token);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const credentials = new UserModel(req.body);
        console.log(credentials)
  
    const token= await userLogic.userRegister(credentials);
    res.json(token);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.body;
    const result = await userLogic.userLogin(user);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const user = cacheModule.extractUserDataFromCache(req);
  res.json(user);
});

export default router;
