import path from "path";
import { fileURLToPath } from "url";

import { loggerConsola, loggerErrorFile } from "../loggerConfig.js";

import axios from "axios";
import msgService from "../services/msg.service.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function getMsgs(req, res) {
  try {
    const data = await msgService.getChats();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ messageError: error });
  }
}

export async function getMsgsByEmail(req, res) {
  try {
    const email = req.params.email;
    const data = await msgService.getChatsByEmail(email);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ messageError: error });
  }
}
export async function insertMsgs(req, res) {
  try {
    const msg = req.body;
    const type = req.user.admin ? "server" : "user";
    const data = await msgService.insertMsg({ msg, type });
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ messageError: error });
  }
}



