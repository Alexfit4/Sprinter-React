import express from "express";
import mongoose from 'mongoose'
import cors from "cors";
const app = express();
import EmployeeRoutes from '../server/routes/employee.js'


app.use(cors());
app.use(express.json());
app.use('/employee', EmployeeRoutes)


// //* CREATE
// app.post("/users", async (req, res) => {
// 	const { first_name, last_name } = req.body;

// 	try {
// 		const user = await User.create({ first_name, last_name });

// 		return res.json(user);
// 	} catch (err) {
// 		console.log(err);
// 		return res.status(500).json({ err: "Something went wrong" });
// 	}
// });
// //* READ

// app.get("/users", async (req, res) => {
// 	try {
// 		const users = await User.find({});

// 		return res.json(users);
// 	} catch (err) {
// 		console.log(err);
// 		return res.status(500).json({ err: "Something went wrong" });
// 	}
// });

// //* UPDATE
// app.put("/user/:id", async (req, res) => {
//     const id =req.params.id
//     const { name, email, role } = req.body
// 	try {
// 		const user = await User.findById(id);

//         //? Update with the new input OR use what input is already there.
//         user.name = name || user.name
//         user.email = email || user.email
//         user.role = role || user.role

//         await user.save()

// 		return res.json(user);
// 	} catch (err) {
// 		console.log(err);
// 		return res.status(500).json({ err: "Something went wrong" });
// 	}
// });



// //* DELETE
// app.delete("/user/:id", async (req, res) => {
//     const id =req.params.id
   
// 	try {
//          //? Either find by id or if there is no id stop the function (orFail)
// 		 await User.findByIdAndDelete(id).orFail();        

// 		return res.json({message: 'User delted succesfully'});
// 	} catch (err) {
// 		console.log(err);
// 		return res.status(500).json({ err: "Something went wrong" });
// 	}
// });

// //* */ FIND
// app.get("/user/:id", async (req, res) => {
//     const id = req.params.id
   
// 	try {
//          //? Either find by id or if there is no id stop the function (orFail())
// 		const user =  await User.findById(id).orFail();        

// 		return res.json(user);
// 	} catch (err) {
// 		console.log(err);
// 		return res.status(500).json({ err: "Something went wrong" });
// 	}
// });

// // * Create a post
// app.post('/post', async (req, res) => {
//     const { userId, body, title } = req.body

    

//     try {
//         //? Either find by id or if there is no id stop the function (orFail)
//         const user =  await User.findById(userId).orFail()
//         const post = await Post.create({ title, body, user: user.id })
//         console.log(post);
//         return  res.json(post);
//     } catch (err) {
//         console.log(err);

//         return res.status(500).json({ err: "Something went wrong" });
//     }
// });



// // * Read (get all posts)
// app.get('/post', async (req, res) => {
//     try {
//         //? Include the users with the their posts(.populate())
//         const post = await Post.find({}).populate('user', '-email -_id')//?hide these fields in the get
//         console.log(post);
//         return  res.json(post);
//     } catch (err) {
//         console.log(err);

//         return res.status(500).json({ err: "Something went wrong" });
//     }
// });


app.listen(5000, () => {
	console.log("Server up");
	mongoose
		.connect("mongodb+srv://AmirA:1234@cluster0.lmphr.mongodb.net/Sprinter?retryWrites=true&w=majority", {
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


