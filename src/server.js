import rutas from "./routes/routes.js";
import express from "express";
import os from "os";
import cluster from "cluster";
import dotenv from "dotenv";
import { loggerConsola, loggerErrorFile } from "./loggerConfig.js";
import { getNotImplementedRoute } from "./controllers/otherRoutesController.js";
import config from "./config/config.js";
import session from "express-session";
import cookieParser from "cookie-parser";
import passport from "passport";
import signupStrategy from "./strategies/signupStrategy.js";
import loginStrategy from "./strategies/loginStrategy.js";
import mongoose from "mongoose";
import MongoStore from "connect-mongo";
import userService from "./services/user.service.js";
import cors from "cors"


const isCluster = config.modo === "CLUSTER";
const Cpus = os.cpus();

dotenv.config();
//CLUSTER
if (isCluster && cluster.isPrimary) {
  for (let index = 0; index < Cpus.length; index++) {
    cluster.fork();
  }

  cluster.on("exit", (worker) => {
    loggerConsola.info(`worker ${worker.process.pid} died`);
    cluster.fork();
  });
} else {
  const conectarDB = async () => {
    try {
      const URL = config.mongodb.URI;
      await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      loggerConsola.info("Conexion establecida con la db");
    } catch (error) {
      loggerConsola.error(error);
      loggerErrorFile.error(error);
    }
  };

  const app = express();
  app.set("views", "./src/views");
  app.set("view engine", "ejs");
  app.use("/api/productos", express.static("html/crearProductos.html"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: config.mongodb.URI,
      }),
      
      secret: config.session.SECRET,
      resave: false,
      rolling: true,
      saveUninitialized: false,
      cookie: {
        httpOnly:false,
        secure:true,
        maxAge: 120000,
        sameSite:'none'
      },
    })
  );
  conectarDB();
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
      const user = await userService.getUserById(id);
    done(null, user);
  });
  passport.use("register", signupStrategy);
  passport.use("login", loginStrategy);
  
  app.set('trust proxy', 1)
  app.use(cors({
    
    origin:'http://127.0.0.1:5500',
    credentials:true,
    
  })) 
  
  app.use("/", rutas);
  app.get("*", getNotImplementedRoute);
  app.listen(config.port, (error) => {
    if (error) {
      loggerConsola.error(error);
      loggerErrorFile.error(error);
    } else {
      loggerConsola.info(`
      Servidor conectado al puerto ${config.port}
      Modo: ${config.modo}`);
    }
  });
}
