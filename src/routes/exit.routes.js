import { Router } from "express";
import { createExit, findExit } from "../controllers/exit.controller.js";
import { authValidation } from "../middlewares/authValidation.middleware.js";

const router = Router();

router.use(authValidation);

router.post("/entradas", createExit);
router.get("/entradas", findExit);

export default router;
