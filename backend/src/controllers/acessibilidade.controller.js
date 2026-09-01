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

    async cadastrarSuporte(req, res){
        const cadastrado = await AcessibilidadeService.cadastrarSuporte(req.body);
        return res.status(201).json(cadastrado);
    }

    async listarSuporte(req, res){
        const listados = await AcessibilidadeService.listarSuporte();
        return res.status(200).json(listados);
    }

    async listarSuporteID(req, res){
        const {id} = req.params;
        const listado = await AcessibilidadeService.listarSuporteID(id);
        return res.status(200).json(listado);
    }

    async atualizarSuporte(req, res){
        const {id} = req.params;
        const suporte = req.body;
        const atualizado = await AcessibilidadeService.atualizarSuporte(id, suporte);
        return res.status(200).json(atualizado);
    }

    async removerSuporte(req, res){
        const {id} = req.params
        const removidos = await AcessibilidadeService.removerSuporte(id);
        return res.status(200).json(removidos);
    }


}export default new AcessibilidadeController();