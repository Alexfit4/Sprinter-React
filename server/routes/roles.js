import express from "express";
import {postRoles, getRoles} from '../controllers/Roles.js'

const router = express.Router();


router.get("/", getRoles)
router.post("/",postRoles);

export default router