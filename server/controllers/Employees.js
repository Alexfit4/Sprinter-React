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
    const { first_name, last_name } = req.body;

	try {
		const employee = await EmployeeSchema.save({ first_name, last_name});

		 res.json(employee);
	} catch (err) {
		console.log(err);
		 res.status(500).json({ err: "Something went wrong" });
	}
};
