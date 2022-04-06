import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const ProjectSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: {},
			required: true,
		},
		postedBy: {
			type: ObjectId,
			ref: "User",
		},
		duration: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Project", ProjectSchema);
