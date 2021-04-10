import express from "express";
import {getEmployees, postEmployees} from '../controllers/Employees.js'

const router = express.Router();

router.get("/",getEmployees);
router.post("/", postEmployees);

export default router;