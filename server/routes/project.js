import express from "express";

const router = express.Router();
import { requireSignin } from "../middlewares";

import {
	createproject,
	getproject,
	updateproject,
	deleteProject,
	userProject,
} from "../controllers/project";
router.post("/add-project", requireSignin, createproject);
router.get("/user-project/:_id", requireSignin, userProject);
router.get("/getproject", requireSignin, getproject);

router.put("/update-project/:_id", requireSignin, updateproject);
router.delete("/delete-project/:_id", requireSignin, deleteProject);

module.exports = router;
