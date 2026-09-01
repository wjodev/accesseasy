import { Router } from "express";
import userController from "../controllers/user.controller.js";
import authController from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

const router = Router();

router.post("/usuarios", userController.cadastrar);
router.post("/login", authController.autenticar);
router.get ("/usuarios", userController.listar);
router.get("/usuarios/cpf/:cpf", userController.buscarCPF);
router.get("/usuarios/:id", userController.buscarId);
router.put("/usuarios/:id", userController.atualizar);
router.put("/usuarios/:id/tipo", 
            authMiddleware.autenticar,
            adminMiddleware.verificar, 
            userController.atualizarTipoUsuario);
router.delete("/usuarios/:id", userController.remover);

export default router;