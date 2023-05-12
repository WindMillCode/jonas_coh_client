import { NextFunction,Request,Response } from "express";

import cacheModule from "../5- logic/cache-module";
import cartLogic from "../5- logic/cart-logic";
var router = require('express').Router();

router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const clientIdentity = cacheModule.extractUserDataFromCache(req).identity;
    const result = await cartLogic.getCart(clientIdentity);
    res.json(result);
  } catch (error) {
    next(error);
  }
});


router.get("/allClientProduct/:cartId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cartId = req.params.cartId;
    const result = await cartLogic.getAllClientProduct(cartId);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productToCart = req.body;
    const result = await cartLogic.insertProductToCart(productToCart);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/all/:cartId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("delete all");
    const { cartId } = req.params;
    const result = await cartLogic.deleteAllProductsFromCart(cartId);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:cartId/product/:productId", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId, cartId } = req.params;
    const result = await cartLogic.deleteProductFromCart(productId, cartId);
    res.json(result);
  } catch (error) {
    next(error);
  }
});


let cartController = router
export default cartController;
