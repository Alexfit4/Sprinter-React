import express from "express";
import {getEmployees, postEmployees, deleteEmployee} from '../controllers/Employees.js'

const router = express.Router();

router.get("/",getEmployees);
router.post("/",postEmployees);
// router.put('/',updateEmployeeRole); //?Do we need to update?
router.delete('/:id',deleteEmployee);

export default router;