import { Router } from "express";
import userController from "../controllers/user.controller.js";
import authController from "../controllers/auth.controller.js";

const router = Router();

router.post("/usuarios", userController.cadastrar);
router.post("/login", authController.autenticar);
router.get ("/usuarios", userController.listar);
router.get("/usuarios/:cpf", userController.buscarCPF);
router.put("/usuarios/:id", userController.atualizar);
router.delete("/usuarios/:id", userController.remover);

export default router;