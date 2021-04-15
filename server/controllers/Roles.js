import Roles from '../models/Roles.js'


export const getRoles = async (req, res) => {
	try {
		const getRoles = await Roles.find();

		console.log(getRoles, "here");

		res.status(200).json(getRoles);
	} catch (error) {
		res.status(404).json({ message: error.message });
	}
};

// Create Routes.
export const postRoles = async (req, res) => {
	const { title, salary } = req.body;

	try {
		const role = await Roles.create({
			title,
			salary,
		});

		return res.json(role);
	} catch (err) {
		console.log(err);
		return res.status(500).json({ err: "Something went wrong" });
	}
};


// DELETE Roles
export const deleteRoles = async (req, res) => {
	const id = req.params.id;
	try {
		await Roles.findByIdAndDelete(id);

		return res.json({message: "Successful deletion!"})
		
	} catch (err) {
		console.log(err);
		return res.status(500).json({ err: "Something went wrong" })
	}
};

