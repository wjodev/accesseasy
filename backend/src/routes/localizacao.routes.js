import { Router } from "express";
import LocalizacaoController from "../controllers/localizacao.controller.js";

const router = Router();

router.post("/localizacao", LocalizacaoController.cadastrar);
router.get("/localizacao", LocalizacaoController.listar);
router.get("/localizacao/:id", LocalizacaoController.listarId);
router.put("/localizacao/:id", LocalizacaoController.atualizar);
router.delete("/localizacao/:id", LocalizacaoController.remover);


export default router;