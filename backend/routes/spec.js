import express from "express";
const router = express.Router();
import { getSpec } from "../controllers/Specializations.js";

router.route("/").get(getSpec);
export default router;
