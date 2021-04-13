import express from "express";
import {getProjects, postProjects, updateProjects, deleteProjects} from '../controllers/Projects.js';

const router = express.Router();

router.get("/",getProjects);
router.post("/",postProjects);
router.put("/:id",updateProjects);
router.delete("/:id",deleteProjects)

export default router;