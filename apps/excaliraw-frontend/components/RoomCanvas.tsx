"use client";
import { WS_URL } from "@/config";
import { useEffect, useState } from "react"

export default function RoomCanvas({roomId}:{roomId:number}){
    const [socket,setSocket]= useState<WebSocket|null>(null);
    useEffect(()=>{
        const ws = new WebSocket(`${WS_URL}?token=`)

        ws.onopen=()=>{
            setSocket(ws)
            const data = JSON.stringify({
                type: "join_room",
                roomId: Number(roomId)
            })
             console.log(data);
            ws.send(data)
        }
    },[])
  if (!socket) {
        return <div>
            Connecting to server....
        </div>
    }

return <div>
    
</div>
}