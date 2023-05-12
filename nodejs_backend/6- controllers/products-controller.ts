import express, { NextFunction, Request, Response } from "express";
import  productLogic from "../5- logic/product-logic";

import verifyLogged from "../3- middleware/verify-logged";
import verifyAdmin from "../3- middleware/verify-admin";
import GetProductModel from "../4- models/GetProduct";
var router = require('express').Router();


router.get("/",verifyLogged, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await productLogic.getAllProduct();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

router.get("/:search",verifyLogged, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const productSearch = "%" + req.params.search + "%";
    const result = await productLogic.getSearchProduct(productSearch);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/",verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    req.body.image = req.files?.image;

    const product = new GetProductModel(req.body);
    const newProduct = await productLogic.addProduct(product)
    res.status(201).json(newProduct);

  } catch (error) {
    next(error);
  }
});

router.put("/",verifyAdmin,async (req: Request, res: Response, next: NextFunction) => {
  try {
    // @ts-ignore
    req.body.image = req.files?.image;
        const product = new GetProductModel(req.body);
        console.log(product);

    const newProduct = await productLogic.updateProduct(product);
    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

// router.delete('/delete_product/:productID([0-9]+)', verifyAdmin, async (req: Request, res: Response, next: NextFunction) => {
//   try {
//       await productLogic.deleteProduct(+req.params.productID);
//       res.status(204).end();
//   } catch (error) {
//       next(error);
//   }
// })

let productController = router
export default productController;
