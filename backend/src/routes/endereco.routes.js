import { Router } from "express";
import EnderecoController from "../controllers/endereco.controller.js";

const router = Router();

router.post("/enderecos", EnderecoController.cadastrar);
router.get("/enderecos", EnderecoController.listar);
router.get("/enderecos/:id", EnderecoController.listarId);
router.put("/enderecos/:id", EnderecoController.atualizar);
router.delete("/enderecos/:id", EnderecoController.remover);

export default router;