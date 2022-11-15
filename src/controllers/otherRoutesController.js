import ARGS from "../yargs/configuration.js";
import os from "os";
import { loggerConsola, loggerWarnFile, loggerErrorFile } from "../loggerConfig.js";
import config from "../config/config.js";
const cpus = os.cpus();

export function redirectFromRoot(req, res) {
  
    if (req.isAuthenticated()) {
      res.redirect("/home");
    } else {
      res.redirect("/usuario/login");
    }
  }
  export function getData(req, res) {
    try {
      loggerConsola.info(
        `Petición recibida para el endpoint: /data, método: GET`
      );
      res.send("datos");
    } catch (error) {
      loggerConsola.error(error);
      loggerErrorFile.error(error);
    }
  }
  export function getHome(req, res) {
    try {
      let user = req.user;
      
      loggerConsola.info(
        `Petición recibida para el endpoint: /home, método: GET`
      );
      res.render("main.ejs", { name: user.firstName });
  
    } catch (error) {
      loggerConsola.error(error);
      loggerErrorFile.error(error);
    }
  }
  export function getInfo(req, res) {
    try{
      const memoria = JSON.stringify(process.memoryUsage(), null, 4);
      const OperativeInfo = {
        Puerto: ARGS.puerto,
        NodeMailerEmail:config.ethereal.EMAIL,
        SessionTime: (config.maxAge/1000)/60,
        MongoAtlasUri:config.mongodb.URI,
        Procesadores: cpus.length,
        Pid: process.pid,
        SO: process.platform,
        Memory: memoria,
        NodeVersion: process.version,
        ExecPath: process.execPath,
        ProjectFolder: process.cwd(),
      };
      
      loggerConsola.info(
        `Petición recibida para el endpoint: /info, método: GET`
      );
      
      res.status(200).render("info.ejs", OperativeInfo);
    }catch(error){
     
      loggerConsola.error(error);
      loggerErrorFile.error(error);
    }
  }
  export function getNotImplementedRoute(req,res){
    try{
      loggerWarnFile.warn(`Ruta: ${req.url} Método: ${req.method} no implementada`);
      if (req.isAuthenticated()) {
        res.redirect("/home");
      } else {
        res.redirect("usuario/login");
      }
    }catch(error){
      loggerConsola.error(error);
      loggerErrorFile.error(error);
    }
  }