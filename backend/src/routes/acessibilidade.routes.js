import { Router } from "express";
import AcessibilidadeController from "../controllers/acessibilidade.controller.js";


const router = Router();
//-------------------------rotas categoria------------------------------------------------
router.post("/acessibilidades/categoria", AcessibilidadeController.cadastrarCategoria);
router.put("/acessibilidades/categoria/:id", AcessibilidadeController.atualizarCategoria);
router.get("/acessibilidades/categoria", AcessibilidadeController.listarCategoria);
router.get("/acessibilidades/categoria/:id", AcessibilidadeController.listarCategoriaID);
router.delete("/acessibilidades/categoria/:id", AcessibilidadeController.removerCategoria);

//----------------------------rotas suporte-------------------------------------------
router.post("/acessibilidades/suporte", AcessibilidadeController.cadastrarSuporte);
router.get("/acessibilidades/suporte", AcessibilidadeController.listarSuporte);
router.get("/acessibilidades/suporte/:id", AcessibilidadeController.listarSuporteID);
router.put("/acessibilidades/suporte/:id", AcessibilidadeController.atualizarSuporte);
router.delete("/acessibilidades/suporte/:id", AcessibilidadeController.removerSuporte);

export default router;