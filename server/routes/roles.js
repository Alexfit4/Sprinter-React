import express from "express";
import {postRoles, getRoles, deleteRoles} from '../controllers/Roles.js'

const router = express.Router();


router.get("/", getRoles)
router.post("/",postRoles);
router.delete("/:id",deleteRoles);

export default router