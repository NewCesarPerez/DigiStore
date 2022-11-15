import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
import DaoFactory from "../daos/factory/dao.factory.js";
const chatDao=DaoFactory.getChatDao()

export async function getChatsByMail(req, res){
    try {
        const userEmail = req.params.email
        
        const verChats = await chatDao.findByEmail(userEmail)
        if(!verChats){return res.status(404).json({error: "No existen chats"})}
        
        res.status(200).json(verChats)
    } catch (error) {
        res.status(error.errorCode).send(error.message); 
    }
}
export async function getChat(req,res){
    res.sendFile(path.join(__dirname, ".././public/views/chat.html"));
 
}