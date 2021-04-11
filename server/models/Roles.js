import mongoose from "mongoose";

const roles = mongoose.Schema(
	{
		title: {
			type: String,
		},
		salary: {
			type: Number,
		},
		createdAt: {
			type: Date,
			default: new Date(),
		},
	},
	{
		toJSON: {
			// include any virtual properties when data is requested
			virtuals: true,
		},
	}
);

const Roles = mongoose.model("Roles", roles);

export default Roles;
