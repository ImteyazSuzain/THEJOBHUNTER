import express from "express";

const router = express.Router();
import { requireSignin, canEditDeletePost, isAdmin } from "../middlewares";

import {
	conversation,
	getuserconversation,
	getconversations,
} from "../controllers/conversation";
router.post("/conversations", requireSignin, conversation);
router.get("/conversations/:_id", requireSignin, getuserconversation);
router.get(
	"/conversations/find/:firstUserId/:secondUserId",
	requireSignin,
	getconversations
);

module.exports = router;
