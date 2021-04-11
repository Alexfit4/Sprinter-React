import EmployeeSchema from "../models/Employee.js";

// Get Routes
export const getEmployees = async (req, res) => {
	try {
		const getEmployee = await EmployeeSchema.find();

		console.log(getEmployee, "here");

		res.status(200).json(getEmployee);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

// Create Routes.
export const postEmployees = async (req, res) => {
	const { first_name, last_name } = req.body;


	try {
		const employee = await EmployeeSchema.create({
			first_name,
			last_name,
		});

		return res.json(employee);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ err: "Something went wrong" });
	}
};

// Add roles to an employee
export const updateEmployeeRole = async (req, res) => {
	const roles = { title: req.body.title, salary: req.body.salary };
	try {
		const employee = await EmployeeSchema.findOneAndUpdate(
			{ first_name: req.body.first_name },
			{ $push: { role: roles } },
			{ new: true }
		);

		await employee.save();

		return res.json(employee);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ err: "Something went wrong" });
	}
};
