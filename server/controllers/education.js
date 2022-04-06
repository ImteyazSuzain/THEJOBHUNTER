import Edu from "../models/education";
import Skill from "../models/skill";

export const education = async (req, res) => {
	const { startdate, enddate, collegeName, education, percentage } = req.body;

	if (!startdate) {
		return res.json({
			error: "Start Date is required",
		});
	}
	if (!enddate) {
		return res.json({
			error: "End Date is required",
		});
	}
	if (!education) {
		return res.json({
			error: "Qualification Level is required",
		});
	}
	if (!collegeName) {
		return res.json({
			error: "College Name is required",
		});
	}
	if (!percentage) {
		return res.json({
			error: "Percentage is required",
		});
	}

	try {
		const edu = new Edu({
			startdate,
			enddate,
			education,
			collegeName,
			percentage,
			postedBy: req.user._id,
		});
		edu.save();

		res.json({
			ok: true,
		});
	} catch (err) {
		console.log(err);
	}
};
export const geteducation = async (req, res) => {
	const geteducation = await Edu.find({ postedBy: req.user._id });

	res.json({
		geteducation,
	});
};

export const userEducation = async (req, res) => {
	try {
		const get = await Edu.findById(req.params._id).populate(
			"postedBy",
			"_id name images"
		);
		res.json(get);
	} catch (err) {
		console.log(err);
	}
};

export const updateEducation = async (req, res) => {
	try {
		const data = await Edu.findByIdAndUpdate(req.params._id, req.body, {
			new: true,
		});
		res.json(data);
	} catch (err) {
		console.log(err);
	}
};
export const deleteEducation = async (req, res) => {
	try {
		const data = await Edu.findByIdAndDelete(req.params._id);
		res.json({
			ok: true,
		});
	} catch (err) {
		console.log(err);
	}
};
