
import { loggerConsola } from "../loggerConfig.js";
import msgService from "../services/msg.service.js";
 
export const socketFunc=async (socket)=>{
    
    if (!socket.request.isAuthenticated()) {
      return socket.emit(
        "server:error",
        "DEBES INICIAR SESION PARA USAR EL CHAT"
      );
    }
    const type = !socket.request.user.admin ? "user" : "admin";
    const email=socket.request.user.email
    loggerConsola.info("Se conecto un usuario nuevo");
    const messagesLog = await msgService.getChats();
    socket.emit("server:message", messagesLog);
    socket.on("client:message", async (data) => {
      loggerConsola.info(data);
      await msgService.insertMsg({email ,...data, type });
      const messages = await msgService.getChats();
      loggerConsola.info("messages " + messages);
      socket.emit("server:message", messages);
    });
  };
  