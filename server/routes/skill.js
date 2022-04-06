import express from "express";

const router = express.Router();
import { requireSignin, canEditDeletePost, isAdmin } from "../middlewares";
import {
	addskill,
	getskill,
	userSkill,
	updateSkill,
	deleteSkill,
} from "../controllers/skill";

router.post("/add-skill", requireSignin, addskill);
router.get("/get-skill", requireSignin, getskill);
router.get("/user-skill/:_id", requireSignin, userSkill);
router.put("/update-skill/:_id", requireSignin, updateSkill);
router.delete("/delete-skill/:_id", requireSignin, deleteSkill);
module.exports = router;
