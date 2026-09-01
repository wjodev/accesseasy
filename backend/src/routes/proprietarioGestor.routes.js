import { Router } from "express";
import ProprietarioGestorController from "../controllers/proprietarioGestor.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";

const router = Router();

router.post( "/proprietario-gestor", authMiddleware.autenticar, adminMiddleware.verificar, ProprietarioGestorController.cadastrar);

router.get( "/proprietario-gestor", authMiddleware.autenticar, ProprietarioGestorController.listar);

router.get("/proprietario-gestor/:id", authMiddleware.autenticar, ProprietarioGestorController.buscarId);

router.delete("/proprietario-gestor/:id", authMiddleware.autenticar, adminMiddleware.verificar, ProprietarioGestorController.remover);

export default router;