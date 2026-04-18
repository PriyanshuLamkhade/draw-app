"use client";
import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import Canvas from "./Canvas";
import { decode } from "punycode";
import { jwtDecode } from "jwt-decode";

export default function RoomCanvas({ roomId }: { roomId: number }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [userId, setUserId] = useState<string>();
  const [initialized, setInitialized] = useState(false);
  useEffect(() => {
    if (initialized) return;
  setInitialized(true);
    const authToken = localStorage.getItem("token");
    const token = authToken?.toString();
    const ws = new WebSocket(`${WS_URL}?token=${token}`);
    if (!token) {
      return console.log("Invalid token format");
    }

    const decoded = jwtDecode(token) as { userId: string };
    setUserId(decoded.userId);
    ws.onopen = () => {
      setSocket(ws);
      const data = JSON.stringify({
        type: "join_room",
        roomId: Number(roomId),
      });
      ws.send(data);
    };
  }, [initialized]);
  if (!socket) {
    return <div>Connecting to server....</div>;
  }
  if (!userId) return <h1>"UserId not found"</h1>;

  return (
    <>
      {socket && <Canvas socket={socket} roomId={roomId} myUserId={userId} />}
    </>
  );
}
