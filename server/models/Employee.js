import mongoose from "mongoose";

const employeeSchema = mongoose.Schema(
	{
		first_name: {
			type: String,
		},
		last_name: {
			type: String,
		},
		role: [
			{
				title: {
					type: String,
				},
				salary: {
					type: Number,
				},
			},
		],
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

const EmployeeSchema = mongoose.model("EmployeeSchema", employeeSchema);

export default EmployeeSchema;
