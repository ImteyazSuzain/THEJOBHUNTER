import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const skillSchema = new mongoose.Schema(
	{
		skill: {
			type: {},
		},
		postedBy: {
			type: ObjectId,
			ref: "User",
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Skill", skillSchema);
