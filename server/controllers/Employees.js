import EmployeeSchema from '../models/Employee.js'

export const getEmployees = async (req, res) => {
	try {
		const getEmployee = await EmployeeSchema.find();

		console.log(getEmployee, "here");

		res.status(200).json(getEmployee);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};