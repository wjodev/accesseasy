import EnderecoService from "../services/endereco.service.js";

class EnderecoController {

    async cadastrar(req, res){
        const cadastrado = await EnderecoService.cadastrar(req.body);
        return res.status(201).json(cadastrado);
    }

    async listar(req, res) {
        const listados = await EnderecoService.listar();
        return res.status(200).json(listados)

    }

    async listarId(req, res) {
        const {id} = req.params;
        const listado = await EnderecoService.listarId(id);
        return res.status(200).json(listado);
    }

    async atualizar(req, res) {
        const { id } = req.params;
        const endereco = req.body;
        const atualizado = await EnderecoService.atualizar(id, endereco);
        return res.status(200).json(atualizado);
    }

    async remover(req, res) {
        const { id } = req.params;
        const removido = await EnderecoService.remover(id);
        return res.status(200).json(removido);
    }

}

export default new EnderecoController();