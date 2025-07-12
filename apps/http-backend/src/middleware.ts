import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import {JWT_SECRET} from "@repo/backend-common/config"
import { ObjectId } from 'mongodb'; 





export function middleware(req:Request,res:Response,next:NextFunction){
    const token = req.headers["authorization"]?? "";
   if(!token){
    res.json({message:"Token Not found"})
   }
   
       const decoded = jwt.verify(token,JWT_SECRET)as { id: string }; 
    if(decoded){
        req.userId = new ObjectId(decoded.id);
    }
   
    
}