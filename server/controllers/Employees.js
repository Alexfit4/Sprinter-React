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

export const postEmployees = async (req, res) => {
	try {
		const postEmployee = await EmployeeSchema.create(
		{
			first_name: req.body,
			last_name: req.body
		}
		);
		console.log(postEmployee, "here");

		res.status(200).json(postEmployee);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};
// CREATE A PROJECT MODEL 