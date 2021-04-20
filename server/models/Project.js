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
        type: Date,
        default: new Date()+30
    },
    manager: {
        type: [String]
    },
    employee: {
        type: [String]
    },
    status: {
        type: String
    },
});

const ProjectSchema = mongoose.model('ProjectSchema', projectSchema);

export default ProjectSchema;

