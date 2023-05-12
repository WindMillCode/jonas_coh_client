import { AuthErrorModel } from '../4- models/error-models';
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import crypto from "crypto";
import User from '../4- models/user-model';

const jwtSecretKey = "MarketJo";
const salt = 'niceSpice!!';

function getJwtToken(user: User): string {
    delete User.password;

    const container = { user };
    const options = {expiresIn: "7h"};
    const token = jwt.sign(container, jwtSecretKey, options);

    return token;
}

function verifyJwtToken(request: Request): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
        try {
            const header = request.header("authorization");
            if(!header){
                resolve(false);
                return;
            }

            const token = header.substring(7);

            if(!token){
                resolve(false);
                return;
            }

            jwt.verify(token, jwtSecretKey, err => {
                if(err){
                    resolve(false);
                    return;
                }
                resolve(true);
            });

        } catch (error) {
            reject(error);
        }

    })
}

function hash(plainText: string): any {
    if(!plainText) return null;

    return crypto.createHmac('sha512', salt).update(plainText).digest('hex');

}

async function getDecodeToken(req: Request):Promise <User>{
    const isValid = await verifyJwtToken(req);
    console.log(req.body);

    if(!isValid) throw new AuthErrorModel("you ain't logged in");

    // @ts-ignore
    const decodeUser: User = jwt.decode(req.header("authorization").substring(7))["user"];
    console.log(decodeUser);

    return decodeUser;
}

export default {
    getJwtToken,
    verifyJwtToken,
    hash,
    getDecodeToken
}

