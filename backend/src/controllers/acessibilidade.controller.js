import AcessibilidadeService from "../services/acessibilidade.service.js";
class AcessibilidadeController{

    async cadastrarCategoria(req, res){
        const cadastrado = await AcessibilidadeService.cadastrarCategoria(req.body);
        return res.status(201).json(cadastrado);
    }

    async atualizarCategoria(req, res){
        const categoria = req.body;
        const {id} = req.params
        const atualizado = await AcessibilidadeService.atualizarCategoria(id, categoria);
        return res.status(200).json(atualizado);
    }

    async listarCategoria(req, res){
        const listados = await AcessibilidadeService.listarCategoria();
        return res.status(200).json(listados);
    }

    async listarCategoriaID(req, res){
        const {id} = req.params
        const consultado = await AcessibilidadeService.listarCategoriaID(id);
        return res.status(200).json(consultado);
    }

    async removerCategoria(req, res){
        const {id} = req.params
        const removidos = await AcessibilidadeService.removerCategoria(id);
        return res.status(200).json(removidos);
    }

    async cadastrarNecessidade(req, res){
        const cadastrado = await AcessibilidadeService.cadastrarNecessidade(req.body);
        return res.status(201).json(cadastrado);
    }

    async listarNecessidades(req, res){
        const listados = await AcessibilidadeService.listarNecessidades();
        return res.status(200).json(listados);
    }

    async listarNecessidadesID(req, res){
        const {id} = req.params;
        const listado = await AcessibilidadeService.listarNecessidadesID(id);
        return res.status(200).json(listado);
    }

    async atualizarNecessidade(req, res){
        const {id} = req.params;
        const necessidade = req.body;
        const atualizado = await AcessibilidadeService.atualizarNecessidade(id, necessidade);
        return res.status(200).json(atualizado);
    }

    async removerNecessidade(req, res){
        const {id} = req.params
        const removidos = await AcessibilidadeService.removerNecessidade(id);
        return res.status(200).json(removidos);
    }


}export default new AcessibilidadeController();