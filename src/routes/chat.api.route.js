import { Router } from "express";
const router = Router();
import {
    getMsgs,
    getMsgsByEmail,
    insertMsgs
  } from "../controllers/msg.controller.js"


router.get("/", getMsgs)
router.get("/:email",getMsgsByEmail);
router.post("/", insertMsgs)

export default router;