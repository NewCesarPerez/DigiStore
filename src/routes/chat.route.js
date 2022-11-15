import { Router } from "express";

const router = Router();
import {
    getChatsByMail,
    getChat
  } from "../controllers/chatController.js";
  router.get('/', getChat)
  router.get("/:email", getChatsByMail);
  
  export default router