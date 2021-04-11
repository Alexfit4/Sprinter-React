import ProjectSchema from '../models/Project.js';


export const getProjects = async (req, res) => {
    try {
        const getProject = await ProjectSchema.find();

        console.log(getProject, "here");

        res.status(200).json(getProject);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const postProjects = async (req, res) => {
    const { title, description, manager, employee } = req.body;

	try {
		const project = await ProjectSchema.save({ 
			title, description, manager, employee 
		});

		 res.json(project);
	} catch (err) {
		console.log(err);
		 res.status(500).json({ err: "Something went wrong" });
	}
};