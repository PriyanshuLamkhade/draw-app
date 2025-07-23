import { WebSocket } from "ws";

//Map 
// users = {
//   "user123": {
//     userId: "user123",
//     sockets: Map {
//       ws1 => Set { 1, 2 },
//       ws2 => Set { 3 }
//     }
//   },
//   "user456": {
//     userId: "user456",
//     sockets: Map {
//       ws3 => Set { 1 }
//     }
//   }
// }
interface User {
    userId: string;
    sockets: Map<WebSocket, Set<number>>;
}

export class stateManger {
    private users: Map<string, User>;

    private static instance: stateManger;

    private constructor() {
        this.users = new Map();
        // this.rooms = new Map();
    }
    static getInstance(): stateManger {
        if (!stateManger.instance) {
            stateManger.instance = new stateManger();
            console.log("New instance")
        }
        console.log("Made a instance")
        return stateManger.instance
    }
    addUser(userId: string, ws: WebSocket): void {

        if (!this.users.get(userId)) {
            this.users.set(userId, {
                userId: userId,
                sockets: new Map([[ws, new Set()]])
            });
            console.log("New User added")
            return;
        }
        else {
            const exsistingUser = this.users.get(userId)
            if (!exsistingUser?.sockets.has(ws)) {
                exsistingUser?.sockets.set(ws, new Set())
                console.log("New ws added to exsisting user")

            }

            return

        }



    }
    getUser(userId: string): User | undefined {
        //getting user by id and not by ws object
        const findUser = this.users.get(userId)
        if (findUser == undefined) {
            return undefined
        }
        if (findUser.userId == userId) {
            return findUser
        }
    }
    addUserToRoom(userId: string, ws: WebSocket, roomId: number): void {
        const user = instance.getUser(userId);
        if (user == undefined) {
            console.log("User Not Found")
            return
        }
        const userSocket = user.sockets.get(ws)
        if (!userSocket) {
            console.log("Socket not found")
            return
        }
        if(userSocket.has(roomId)){
            console.log("User is already joined")
            return
        }
        userSocket.add(roomId)
        console.log(`User ${userId} with this socket joined room ${roomId}`);
        return


    }
    removeUserFromRoom(userId: string, ws: WebSocket, roomId: number): void {
        const user = instance.getUser(userId);
        if (user == undefined) {
            console.log("User Not Found")
            return
        }

        const rooms = user.sockets.get(ws);
        if (rooms?.has(roomId)) {
            rooms.delete(roomId);
            console.log("User left")
        }
    }
    getUsersInRoom(roomId: number): WebSocket[] {
        const webSocketsInRoom: WebSocket[] = []
        for (const user of this.users.values()) {
            for (const [ws, rooms] of user.sockets) {
                if (rooms.has(roomId)) {
                    webSocketsInRoom.push(ws)
                }
            }
        }


        return webSocketsInRoom
    }

    // removeUser(userId: string): void
    // createRoom(roomName: string): void
    // deleteRoom(roomName: string): void
    // getRoom(roomName: string): Room | undefined

}

export const instance = stateManger.getInstance()