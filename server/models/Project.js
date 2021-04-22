import mongoose from "mongoose";

const newDate = (date) => {
    let x = new Date(date);
    return x.toLocaleDateString();
};

// const date1 = new Date("");
// const date2 = new Date("");
// const diffTime = Math.abs(date2 - date1);
// console.log(diffTime + "days");


const projectSchema = mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: [String]
    },
    startDate: {
        type: String
    },
    endDate: {
       type: String
    },
    finalDate: {
        type: String,
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

//? Before we save this document into our database/collection lets do something with it
projectSchema.pre('save', function(){
    
    this.finalDate = newDate(this.endDate)
})


const ProjectSchema = mongoose.model('ProjectSchema', projectSchema);

export default ProjectSchema;

