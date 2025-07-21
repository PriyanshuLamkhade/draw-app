import { WebSocket } from "ws";
interface User {
    userId: string;
    ws: WebSocket;
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
        if (this.users.get(userId)) {
            console.log("User Already Exist")
            return;
        }
        this.users.set(userId, {
            userId: userId,
            ws: ws,
            rooms: new Set()
        })

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
    addUserToRoom(userId: string, roomId: number): void {
        const user = instance.getUser(userId);
        if (user == undefined) {
            console.log("User Not Found")
            return 
        }
        
        if(user.rooms?.has(roomId)){
            console.log("Room already exsists")
        } else {
            console.log("Joining Room "+roomId)
            user.rooms?.add(roomId)
            return 
        }

    }
    removeUserFromRoom(userId: string, roomId: number): void {
         const user = instance.getUser(userId);
        if (user == undefined) {
            console.log("User Not Found")
            return 
        }
        
        if(user.rooms?.has(roomId)){
            user.rooms.delete(roomId)
            console.log("Room Left")
        } 
    }
    getUsersInRoom(roomId: number): User[] {
     const usersInRoom:User[] = []
        for(const user of this.users.values()){
            if(user.rooms?.has(roomId)){
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