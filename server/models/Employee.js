import mongoose from "mongoose";

const employeeSchema = mongoose.Schema({
	first_name:{
        type: String
    },
	last_name:{
        type: String
    },
	createdAt: {
		type: Date,
		default: new Date(),
	},
});

const EmployeeSchema = mongoose.model('EmployeeSchema', employeeSchema)

export default EmployeeSchema