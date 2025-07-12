import express from "express";
import jwt from "jsonwebtoken"
import { middleware } from "./middleware";
import {JWT_SECRET} from "@repo/backend-common/config"
import {CreateUserSchema} from "@repo/common/types"

const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success){
         res.json({message:"Incorrect Inputs"})
         return
    }
    //db call
    res.json({
        userId:123
    })
})
app.post("/signin", async function (req, res) {
    const { username, password } = req.body

    const user = {_id : 1}; //db call
    const token = jwt.sign({
        id: user._id
    }, JWT_SECRET)
    res.json({
        token
    })
})
app.post("/rooms",middleware, async function (req, res) {
    //db call
    res.json({
        roomId:123
    })
})

app.listen(3001)
