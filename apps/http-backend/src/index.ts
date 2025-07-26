import express from "express";
import jwt from "jsonwebtoken"
import { middleware } from "./middleware";
import { JWT_SECRET } from "@repo/backend-common/config"
import { CreateUserSchema, CreateRoomSchema, SigninSchema } from "@repo/common/types"
import { prismaClient } from "@repo/db/db";
const bcrypt = require('bcrypt');
const app = express();
app.use(express.json());

app.post("/signup", async function (req, res) {
    const parseData = CreateUserSchema.safeParse(req.body);
    if (!parseData.success) {
        console.log(parseData.error)
        res.json({ message: "Incorrect Inputs" })
        return
    }
    try {
        const hashPassword = await bcrypt.hash(parseData.data.password, 5)

        const user = await prismaClient.user.create({
            data: {
                email: parseData.data.email,
                password: hashPassword,
                name: parseData.data.name
            }
        })

        res.json({
            userId: user.id
        })
    } catch (error) {
        res.status(411).json(error)
    }

})
app.post("/signin", async function (req, res) {

    const parseData = SigninSchema.safeParse(req.body);
    try {
        if (!parseData.success) {
            res.json({ message: "incorrect credentials" })
            return
        }
        const user = await prismaClient.user.findFirst({
            where: {
                email: parseData.data.email
            }
        })
        if (!user) {
            res.json({ message: "user not found" })
        }
        const comparedPassword = await bcrypt.compare(parseData.data.password, user?.password)
        if (comparedPassword) {
            const token = jwt.sign({
                userId: user?.id
            }, JWT_SECRET)
            res.json({ jwt: token })
        }


    } catch (error) {
        res.json(error)
    }


})
app.post("/room", middleware, async function (req, res) {
    const parseData = CreateRoomSchema.safeParse(req.body)
    try {
        if (!parseData.success) {
            res.json({ message: "Incorrect inputs" })
            return
        }
        const userId = req.userId

        if (!userId) {
            res.json({ message: "User not found" })
            return
        }

        const room = await prismaClient.room.create({
            data: {
                slug: parseData.data?.name,
                adminId: userId
            }
        })
        res.json({
            roomId: room.id,
            createdAt: room.createdAt
        })
    } catch (error) {
        res.json(error)
    }

})
app.get("/chats/:roomId", async (req, res) => {
    try {
        const roomId = Number(req.params.roomId)
        const messages = await prismaClient.chat.findMany({
            where: {
                roomId: roomId
            },
            orderBy: {
                id: "desc"
            },
            take: 50
        })


        res.json({
            messages
        })
    } catch (error) {
        console.log(error)
        res.json({
            messages: []
        })
    }
})

app.get("/room/:slug", async (req, res) => {
    try {
        const slug = req.params.slug
        const room = await prismaClient.room.findFirst({
            where: {
                slug
            }
        })
        res.json({
            room
        })
    } catch (error) {
        console.log(error)
        res.json({
            message: "Error"
        })
    }

})

app.listen(3001)
