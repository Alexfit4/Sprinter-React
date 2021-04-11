import express from "express";
import {getProjects, postProjects} from '../controllers/Projects.js';

const router = express.Router();

router.get("/",getProjects);
router.post("/",postProjects);

export default router;