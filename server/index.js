import express from "express";
import mongoose from 'mongoose';
import cors from "cors";


const app = express();
import EmployeeRoutes from '../server/routes/employee.js'
import RolesRoutes from '../server/routes/roles.js'
import ProjectRouter from '../server/routes/project.js'

app.use(cors()); // ! DO NOT MOVE! Important for front end. 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/employee', EmployeeRoutes)
app.use('/roles', RolesRoutes)
app.use('/projects', ProjectRouter)


const PORT = process.env.PORT || 5000;
const CONNECTION_URL = process.env.MONGODB_URI || "mongodb+srv://AmirA:1234@cluster0.lmphr.mongodb.net/Sprinter?retryWrites=true&w=majority";

app.use(function(req, res) {
    res.sendFile(path.join(__dirname, "./client/build/index.html"));
  });

app.listen(PORT, () => {
	console.log("Server up");
	mongoose
		.connect(CONNECTION_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		})
		.then(() => {
			console.log("Database Connected");
		})
		.catch((err) => {
			console.log(err);
		});
	console.log(`Server started on port`);
});


