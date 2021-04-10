import express from "express";
import mongoose from 'mongoose'
import employeeRoutes from './routes/employee.js'
const app = express();


app.use('/employees', employeeRoutes)


const CONNECTION_URL =
	"mongodb+srv://AmirA:1234@cluster0.lmphr.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const PORT = process.env.PORT || 5000;

mongoose
	.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() =>
		app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
	)
	.catch((error) => console.log(error.message));
mongoose.set("useFindAndModify", false);
