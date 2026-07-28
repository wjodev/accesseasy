import { Router } from "express";
import AcessibilidadeController from "../controllers/acessibilidade.controller.js";


const router = Router();
//-------------------------rotas categorias------------------------------------------------
router.post("/acessibilidades/categorias", AcessibilidadeController.cadastrarCategoria);
router.put("/acessibilidades/categorias/:id", AcessibilidadeController.atualizarCategoria);
router.get("/acessibilidades/categorias", AcessibilidadeController.listarCategoria);
router.get("/acessibilidades/categorias/:id", AcessibilidadeController.listarCategoriaID);
router.delete("/acessibilidades/categorias/:id", AcessibilidadeController.removerCategoria);

//----------------------------rotas necessidades-------------------------------------------
router.post("/acessibilidades/necessidades", AcessibilidadeController.cadastrarNecessidade);
router.get("/acessibilidades/necessidades", AcessibilidadeController.listarNecessidades);
router.get("/acessibilidades/necessidades/:id", AcessibilidadeController.listarNecessidadesID);
router.put("/acessibilidades/necessidades/:id", AcessibilidadeController.atualizarNecessidade);
router.delete("/acessibilidades/necessidades/:id", AcessibilidadeController.removerNecessidade);

export default router;