import { WebSocket } from "ws";

// Map structure example:
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

export class StateManager {
  private users: Map<string, User>;
  private static instance: StateManager;

  private constructor() {
    this.users = new Map();
  }

  static getInstance(): StateManager {
    if (!StateManager.instance) {
      StateManager.instance = new StateManager();
      console.log("New instance created");
    }
    return StateManager.instance;
  }

  addUser(userId: string, ws: WebSocket): void {
    if (!this.users.has(userId)) {
      this.users.set(userId, {
        userId,
        sockets: new Map([[ws, new Set()]]),
      });
      console.log("New user added");
      return;
    }

    const existingUser = this.users.get(userId)!;
    if (!existingUser.sockets.has(ws)) {
      existingUser.sockets.set(ws, new Set());
      console.log("New WebSocket added to existing user");
    }
  }

  getUser(userId: string): User | undefined {
    return this.users.get(userId);
  }

  /** ✅ FIXED: this was missing the name before */
  addUserToRoom(userId: string, ws: WebSocket, roomId: number): void {
    const user = this.getUser(userId);
    if (!user) {
      console.log("User not found");
      return;
    }

    const userSocket = user.sockets.get(ws);
    if (!userSocket) {
      console.log("Socket not found for user");
      return;
    }

    if (userSocket.has(roomId)) {
      console.log("User is already joined in the room");
      return;
    }

    userSocket.add(roomId);
    console.log(`User ${userId} (socket) joined room ${roomId}`);
  }

  removeUserFromRoom(userId: string, ws: WebSocket, roomId: number): void {
    const user = this.getUser(userId);
    if (!user) {
      console.log("User not found");
      return;
    }

    const rooms = user.sockets.get(ws);
    if (rooms?.has(roomId)) {
      rooms.delete(roomId);
      console.log(`User ${userId} left room ${roomId}`);
    }
  }

  getUsersInRoom(roomId: number): WebSocket[] {
    const webSocketsInRoom: WebSocket[] = [];

    for (const user of this.users.values()) {
      for (const [ws, rooms] of user.sockets) {
        if (rooms.has(roomId)) {
          webSocketsInRoom.push(ws);
        }
      }
    }

    return webSocketsInRoom;
  }

  removeUser(userId: string): void {
    if (this.users.has(userId)) {
      this.users.delete(userId);
      console.log(`User ${userId} removed from state manager`);
    }
  }
}

export const instance = StateManager.getInstance();
