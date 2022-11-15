import { Server } from  "socket.io";
import DaoFactory from '../daos/factory/dao.factory.js';
import { loggerErrorFile } from '../loggerConfig.js';

const DAO = DaoFactory.getChatDao()



// LADO SERVIDOR
export async function configChatMongo(expressServer){
    const io = new Server(expressServer)

    io.on('connection', async socket=>{
        
        let chatmessages= await DAO.getAll()
        io.emit('serverSend:message',chatmessages)
        try {
            socket.on('client:message', async messageInfo=>{
               
                try {
                    await DAO.create({...messageInfo,type:"usuario"})
                    chatmessages = await DAO.getAll()    
                } catch (error) {
                    console.log(error)
                }
                
                io.emit('serverSend:message', chatmessages)//EMITO CHATS
            })
           
        } catch (error) {
            loggerErrorFile.error('problema chat lado server', error)
        }
        
      
    })

} 