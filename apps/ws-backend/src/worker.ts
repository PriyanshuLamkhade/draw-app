import { Worker } from "bullmq";

import { prismaClient } from "@repo/db/db";
console.log("Worker process started");

    const chatWorker = new Worker("chat-queue", async (job)=>{
      try {
          const {type,roomId,message,userId} = job.data
          console.log("Writing to DB...");
          await prismaClient.chat.create({
                  data:{
                      roomId:roomId,
                      message:message,
                      userId:userId
                  }
              })
          console.log("DB write complete");
     
      } catch (error) {
        console.error(error)
      }
    },{
  connection: { host: "127.0.0.1", port: 6379 }
}) 









