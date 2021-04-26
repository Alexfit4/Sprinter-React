import EmployeeSchema from "../models/Employee.js";
import Roles from '../models/Roles.js'

// Get Routes
export const getEmployees = async (req, res) => {
    try {
        // Include the roles with employees.populate())
        const employee = await EmployeeSchema.find({}).populate('role', "-createdAt")// hide these fields in the get
        console.log(employee);
        return res.json(employee);
    } catch (err) {
        console.log(err);

        return res.status(500).json({ err: "Something went wrong" });
    }
};


// Add roles to an employee //? Do we need this?
// export const updateEmployeeRole = async (req, res) => {
// 	const roles = { title: req.body.title, salary: req.body.salary };
// 	try {
// 		const employee = await EmployeeSchema.findOneAndUpdate(
// 			{ first_name: req.body.first_name },
// 			{ $push: { role: roles } },
// 			{ new: true }
// 		);

// 		await employee.save();

// 		return res.json(employee);
// 	} catch (err) {
// 		console.log(err);
// 		return res.status(500).json({ err: "Something went wrong" });
// 	}
// };

// Create an employee and assign an existing role to that employee
export const postEmployees = async (req, res) => {
    const { roleId, first_name, last_name } = req.body;

    try {
        const role = await Roles.findById(roleId).orFail()
        const employee = await EmployeeSchema.create({
            first_name,
            last_name,
            role: role.id,

        });
        const updatedEmpList = await EmployeeSchema.find({}).populate('role', "-createdAt")
        return res.json({ employee, updatedEmpList });

    } catch (err) {
        console.log(err, "Something went wrong");

        return res.json(err);
    }
};


// DELETE Roles
export const deleteEmployee = async (req, res) => {
    const id = req.params.id;
    try {
        await EmployeeSchema.findByIdAndDelete(id);
        const updatedEmpList = await EmployeeSchema.find({}).populate('role', "-createdAt")
        console.log("This is an updated Emp List ", updatedEmpList);
        return res.json({
            message: `Successfully deleted ${id}!`,
            updatedEmpList

        })

    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: "Something went wrong" })
    }
};
