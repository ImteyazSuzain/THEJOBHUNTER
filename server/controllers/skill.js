import Skill from "../models/skill";

export const addskill = async (req, res) => {
	const { skill } = req.body;
	if (!skill) {
		return res.json({
			error: "Skill is required",
		});
	}

	try {
		const skills = new Skill({
			skill,
			postedBy: req.user._id,
		});
		skills.save();

		res.json({
			ok: true,
		});
	} catch (err) {
		console.log(err);
	}
};
export const getskill = async (req, res) => {
	try {
		const skill = await Skill.find({ postedBy: req.user._id }).select(
			"-id -postedBy -createdAt -updatedAt -__v"
		);
		const _id = await Skill.find({ postedBy: req.user._id }).select(
			"-skill -postedBy -createdAt -updatedAt -__v"
		);
		res.json({
			skill,
			_id,
		});
	} catch (err) {
		console.log(err);
	}
};

export const userSkill = async (req, res) => {
	try {
		const data = await Skill.findById(req.params._id);
		res.json(data);
	} catch (err) {
		console.log(err);
	}
};

export const updateSkill = async (req, res) => {
	try {
		console.log(req.body);
		const data = await Skill.findByIdAndUpdate(req.params._id, req.body, {
			new: true,
		});
		res.json(data);
	} catch (err) {
		console.log(err);
	}
};

export const deleteSkill = async (req, res) => {
	try {
		const data = await Skill.findByIdAndDelete(req.params._id);
		res.json({
			ok: true,
		});
	} catch (err) {
		console.log(err);
	}
};
