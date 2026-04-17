import { HTTP_BACKEND } from '@/config';
import axios from "axios"

async function getExsistingShapes(roomId:any)  {
 
     const res = await axios.get(`${HTTP_BACKEND}/chats/${roomId}`);
    const messages = res.data.messages;

    const shapes = messages.map((x: {message: string}) => {
        const messageData = JSON.parse(x.message)
        return messageData.shape;
    })

    return shapes;
  
}

export default getExsistingShapes