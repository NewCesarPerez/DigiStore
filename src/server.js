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
import msgService from "./services/msg.service.js";
import {socketFunc} from"./utils/socket.js"
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import { Server as IOServer } from "socket.io";
import { ConfigurationContext } from "twilio/lib/rest/conversations/v1/configuration.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
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
      await mongoose.connect("mongodb+srv://CesarPerezMora:Jumpforce_2022@chproject.fgyalnv.mongodb.net/?retryWrites=true&w=majority", {
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
  //app.use("/mensajes", express.static("../public/chat.html"));
  app.use("/mensajes", express.static(path.join(__dirname, ".././src/public")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());
  const sessionMiddleware = session({
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://CesarPerezMora:Jumpforce_2022@chproject.fgyalnv.mongodb.net/?retryWrites=true&w=majority",
    }),

    secret: config.session.SECRET,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    cookie: {
      maxAge: Number(config.maxAge),
    },
  });
  app.use(sessionMiddleware);
  conectarDB();
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use("register", signupStrategy);
  passport.use("login", loginStrategy);
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(async function (id, done) {
    const user = await userService.getUserById(id);
    done(null, user);
  });

  app.use("/", rutas);
  app.get("*", getNotImplementedRoute);
  const expressServer = app.listen(process.env.PORT||config.port, (error) => {
    if (error) {
      loggerConsola.error(error);
      loggerErrorFile.error(error);
    } else {
      console.log();
      loggerConsola.info(`
      Servidor conectado al puerto ${config.port}
      Modo: ${config.modo}`);
    }
  });
  const io = new IOServer(expressServer);
  const wrap = (middleware) => (socket, next) =>
    middleware(socket.request, {}, next);
  io.use(wrap(sessionMiddleware));
  io.use(wrap(passport.initialize()));
  io.use(wrap(passport.session()));
  io.on("connection", socketFunc);
}
