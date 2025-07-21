import { WebSocket } from "ws";
interface User {
    userId: string;
    ws: Set<WebSocket>;
    rooms?: Set<number>
}
// interface Room {
//     name: string;
//     user?: Set<string>
// }

export class stateManger {
    private users: Map<string, User>;
    // private rooms: Map<string, Room>;
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

        const existingUser = this.users.get(userId)
        if (existingUser) {
            existingUser.ws.add(ws)
            console.log("exsisting user add the ws object")
            return
        }
        this.users.set(userId, {
            userId: userId,
            ws: new Set([ws]),
            rooms: new Set()
        })

    }
    getUser(userId: string): User | undefined {
        return this.users.get(userId);
    }
    addUserToRoom(userId: string, roomId: number): void {
        const user = instance.getUser(userId);
        if (!user) {
            console.log("User Not Found")
            return
        }

        user.rooms?.add(roomId)
        console.log(`User ${userId} joined room ${roomId}`);

    }
    removeUserFromRoom(userId: string, roomId: number): void {
        const user = instance.getUser(userId);
        if (!user) {
            console.log("User Not Found")
            return
        }

        if (user.rooms?.has(roomId)) {
            user.rooms.delete(roomId)
              console.log(`User ${userId} left room ${roomId}`);
        }
    }
    getUsersInRoom(roomId: number): User[] {
        const usersInRoom: User[] = []
        for (const user of this.users.values()) {
            if (user.rooms?.has(roomId)) {
                usersInRoom.push(user)
            }
        }


        return usersInRoom
    }

    // removeUser(userId: string): void
    // createRoom(roomName: string): void
    // deleteRoom(roomName: string): void
    // getRoom(roomName: string): Room | undefined

}

export const instance = stateManger.getInstance()