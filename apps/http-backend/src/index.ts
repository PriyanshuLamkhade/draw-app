import express from "express";
import jwt from "jsonwebtoken"
import { middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config"
import { CreateUserSchema, CreateRoomSchema, SigninSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/db";
const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
    const parseData = CreateUserSchema.safeParse(req.body);
    if (!parseData.success) {
        res.json({ message: "Incorrect Inputs" })
        return
    }
    try {
        await prismaClient.user.create({
            data: {
                email: parseData.data.username,
                password: parseData.data.password,
                name: parseData.data.name
            }
        })

        res.json({
            userId: 123
        })
    } catch (error) {
        res.status(411).json(error)
    }

})
app.post("/signin", async function (req, res) {
    const { username, password } = req.body

    const user = { _id: 1 }; //db call
    const token = jwt.sign({
        id: user._id
    }, JWT_SECRET)
    res.json({
        token
    })
})
app.post("/rooms", middleware, async function (req, res) {
    //db call
    res.json({
        roomId: 123
    })
})

app.listen(3001)
