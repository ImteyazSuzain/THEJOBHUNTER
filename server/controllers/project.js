import Project from "../models/project";

export const createproject = async (req, res) => {
	const { name, duration, description } = req.body;
	if (!name) {
		return res.json({
			error: "Name is required",
		});
	}
	if (!duration) {
		return res.json({
			error: "Duration is required",
		});
	}
	if (!description) {
		return res.json({
			error: "Description is required",
		});
	}
	try {
		const project = new Project({
			name,
			duration,
			description,
			postedBy: req.user._id,
		});
		project.save();

		res.json({
			ok: true,
		});
	} catch (err) {
		console.log(err);
	}
};
export const getproject = async (req, res) => {
	const getproject = await Project.find({ postedBy: req.user._id });

	res.json({
		getproject,
	});
};

export const updateproject = async (req, res) => {
	try {
		const data = await Project.findByIdAndUpdate(req.params._id, req.body, {
			new: true,
		});
		res.json(data);
	} catch (err) {
		console.log(err);
	}
};
export const deleteProject = async (req, res) => {
	try {
		const data = await Project.findByIdAndDelete(req.params._id);
		res.json({
			ok: true,
		});
	} catch (err) {
		console.log(err);
	}
};
export const userProject = async (req, res) => {
	try {
		const get = await Project.findById(req.params._id);
		res.json(get);
	} catch (err) {
		console.log(err);
	}
};
// export const addeducation = async (req, res) => {
// 	const {
// 		startdate,
// 		enddate,
// 		education,
// 		percentage,
// 		skill,
// 		duration,
// 		description,
// 		name,
// 	} = req.body;
// 	try {
// 		const edu = new Edu({
// 			startdate,
// 			enddate,
// 			education,
// 			percentage,
// 			skill,
// 			projects: {
// 				duration: duration,
// 				description: description,
// 				name: name,
// 			},
// 			postedBy: req.user._id,
// 		});
// 		await edu.save();
// 	} catch (err) {
// 		console.log(err);
// 	}
// };
// export const addskill = async (req, res) => {
// 	const { skill } = req.body;
// 	try {
// 		const skills = new Skill({
// 			skill,
// 			postedBy: req.user._id,
// 		});
// 		skills.save();

// 		res.json({
// 			ok: true,
// 		});
// 	} catch (err) {
// 		console.log(err);
// 	}
// };
// export const getskill = async (req, res) => {};
