import { WebSocketServer } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken'
import { JWT_SECRET } from "@repo/backend-common/config"
import { instance } from './stateManager';
import { prismaClient } from "@repo/db/db";
const wss = new WebSocketServer({ port: 8080 });

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET)

    if (typeof decoded == "string") {
      console.log("Is string")
      return null
    }
    if (!decoded || !decoded.userId) {
      console.log("Not found")
      return null
    }
    console.log(decoded.userId)
    return decoded.userId

  } catch (error) {
    console.log(error)
    return null
  }

}


wss.on('connection', function connection(ws, request) {
  const url = request.url

  if (!url) {
    return
  }

  const queryParams = new URLSearchParams(url.split('?')[1])
  const token = queryParams.get('token') || ""
  const userId = checkUser(token)
  if (userId == null) {
    ws.close()
    return
  }

  instance.addUser(userId, ws)


  ws.on('message', async function message(data) {
    //message type
    // { type : "join_room", roomId : 1 }
    // { type : "leave_room", roomId : 1 }
    // { type : "chat", message: "hi there" ,roomId : 1 }

    try {


      const parsedData = JSON.parse(data as unknown as string)

      if (parsedData.type == "join_room") {
        if (typeof parsedData.roomId !== "number") {
          console.log("Invalid roomId type");
          return;
        }
        const findRoom = await prismaClient.room.findUnique({
          where: { id: parsedData.roomId }
        })

        if (findRoom == null) {
          console.log("Room not in db")
          return
        }
        instance.addUserToRoom(userId, parsedData.roomId)


      }

      if (parsedData.type == "leave_room") {
        if (typeof parsedData.roomId !== "number") {
          console.log("Invalid roomId type");
          return;
        }
        instance.removeUserFromRoom(userId, parsedData.roomId

        )
      }

      if (parsedData.type === "chat") {
        const roomId = parsedData.roomId;
        const message = parsedData.message;

        const roomUsers = instance.getUsersInRoom(roomId);

        roomUsers.forEach(user => {
          for (const ws of user.ws) {
            ws.send(JSON.stringify({
              type: "chat",
              message: message
            }));
          }
          console.log(roomUsers)
        });
      }



    } catch (error) {
      console.log(error)
    }

  });


});