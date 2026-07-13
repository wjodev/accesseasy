import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.post("/usuarios", userController.cadastrar);
router.post("/buscarUsuario", userController.buscarUsuario);

export default router;