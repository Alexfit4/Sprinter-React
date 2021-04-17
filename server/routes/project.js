import express from "express";
import {getProjects, getOneProject, postProjects, updateProjects, deleteProjects} from '../controllers/Projects.js';

const router = express.Router();

router.get("/",getProjects);
router.get("/:id",getOneProject);
router.post("/",postProjects);
router.put("/:id",updateProjects);
router.delete("/:id",deleteProjects)

export default router;