import { Queue } from "bullmq"
  const sendChat = new Queue("chat-queue",{
    connection:{
        host:"127.0.0.1",
        port:6379
    }
})

export function chatProducer(roomId:number,message:string,userId:string){

    sendChat.add("send message",{
       
        roomId:roomId,
        message:message,
        userId:userId
    })
    console.log("Job added to queue")
}



