import express from "express";
import {getEmployees, postEmployees, updateEmployeeRole} from '../controllers/Employees.js'

const router = express.Router();

router.get("/",getEmployees);
router.post("/",postEmployees);
router.put('/',updateEmployeeRole);

export default router;