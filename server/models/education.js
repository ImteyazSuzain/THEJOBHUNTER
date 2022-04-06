import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema;

const eduSchema = new mongoose.Schema(
	{
		startdate: {
			type: String,
			required: true,
		},
		postedBy: {
			type: ObjectId,
			ref: "User",
		},
		enddate: {
			type: String,
			required: true,
		},
		education: {
			type: String,
			required: true,
		},
		collegeName: {
			type: String,
			required: true,
		},
		percentage: {
			type: String,
			required: true,
		},
	},
	{ timestamps: true }
);

export default mongoose.model("Edu", eduSchema);
