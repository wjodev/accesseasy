import LocalizacaoService from "../services/localizacao.service.js";

class LocalizacaoController {

    async cadastrar(req, res){
        const cadastrado = await LocalizacaoService.cadastrar(req.body);
        return res.status(201).json(cadastrado);
    }

    async listar(req, res) {
        const listados = await LocalizacaoService.listar();
        return res.status(200).json(listados)

    }

    async listarId(req, res) {
        const {id} = req.params;
        const listado = await LocalizacaoService.listarId(id);
        return res.status(200).json(listado);
    }

    async atualizar(req, res) {
        const { id } = req.params;
        const localizacao = req.body;
        const atualizado = await LocalizacaoService.atualizar(id, localizacao);
        return res.status(200).json(atualizado);
    }

    async remover(req, res) {
        const { id } = req.params;
        const removido = await LocalizacaoService.remover(id);
        return res.status(200).json(removido);
    }

}

export default new LocalizacaoController();