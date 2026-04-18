import "dotenv/config";
import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { instance } from "./stateManager";
import { prismaClient } from "@repo/db/db";
import { chatProducer } from "./producer";
import { WebSocket } from "ws";
const wss = new WebSocketServer({ port: 8080 });

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (typeof decoded == "string") {
      console.log("Is string");
      return null;
    }

    if (!decoded || !decoded.userId) {
      console.log("Not found");
      return null;
    }

    console.log(decoded.userId);
    return decoded.userId;
  } catch (error) {
    console.log(error);
    return null;
  }
}

wss.on("connection", function connection(ws, request) {
  const url = request.url;

  if (!url) {
    return;
  }

  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token") || "";
  const userId = checkUser(token);

  if (userId == null) {
    ws.close();
    return;
  }

  instance.addUser(userId, ws);

  ws.on("message", async function message(data) {
    //message type
    // { type : "join_room", roomId : 1 }
    // { type : "leave_room", roomId : 1 }
    // { type : "chat", message: "hi there" ,roomId : 1 }

    try {
      const parsedData = JSON.parse(data as unknown as string);

      if (parsedData.type == "join_room") {
        const roomId = Number(parsedData.roomId);

        const findRoom = await prismaClient.room.findUnique({
          where: { id: roomId },
        });

        if (findRoom == null) {
          console.log("Room not in db");
          return;
        }

        const user = instance.getUser(userId);

        if (!user) return;

        if (user.rooms.has(roomId)) {
          console.log("Already joined room, skipping");
          return;
        }
        instance.addUserToRoom(userId, ws, roomId);

        ws.send(
          JSON.stringify({
            type: "joined",
            roomId,
          }),
        );
      }

      if (parsedData.type == "leave_room") {
        const roomId = Number(parsedData.roomId);
        instance.removeUserFromRoom(userId, ws, roomId);
      }

      if (parsedData.type == "chat") {
        console.log("CHAT EVENT RECEIVED");
        const roomId = Number(parsedData.roomId);
        let message = parsedData.message;

        const roomWebSocket = instance.getUsersInRoom(roomId);

        // const found = roomWebSocket.find((element) => element == ws);
        // if(!found) {
        //   console.log("Socket not connected, cannot send message")
        //   return
        // }
        if (typeof message !== "string") {
          message = JSON.stringify(message);
        }

        chatProducer(roomId, message, userId);
        console.log("Users in room:", roomWebSocket.length);
        roomWebSocket.forEach((clientWs) => {
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(
              JSON.stringify({
                type: "chat",
                message,
                roomId,
                userId,
              }),
            );
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  });

  ws.on("close", () => {
    instance.removeUser(userId);
  });
});
