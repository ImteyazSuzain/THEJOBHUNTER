import express from "express";

const router = express.Router();
import { requireSignin, canEditDeletePost, isAdmin } from "../middlewares";

import { messages, getmessages } from "../controllers/message";

router.post("/messages", requireSignin, messages);
router.get("/messages/:conversationId", requireSignin, getmessages);

module.exports = router;
