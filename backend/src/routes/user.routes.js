import { Router } from "express";
import userController from "../controllers/user.controller.js";

const router = Router();

router.post("/usuarios", userController.cadastrar);
router.get ("/usuarios", userController.listar);
router.get("/usuarios/:cpf", userController.buscarUsuario);
router.put("/usuarios/:id", userController.atualizar);
router.delete("/usuarios/:id", userController.remover);

export default router;