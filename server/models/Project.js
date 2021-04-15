import mongoose from "mongoose";

const projectSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: [String]
    },
    startDate: {
        type: Date,
        default: new Date(),
    },
    endDate: {
        type: Date
    },
    manager: {
        type: [String]
    },
    employee: {
        type: [String]
    },
});

const ProjectSchema = mongoose.model('ProjectSchema', projectSchema);

export default ProjectSchema;