import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
	first_name: String,
	last_name: String,
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

const EmployeeSchema = mongoose.model('EmployeeSchema', employeeSchema);

export default EmployeeSchema;