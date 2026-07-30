import EnderecoService from "../services/endereco.service.js";

class EnderecoController {

    async cadastrar(req, res){
        const cadastrado = await EnderecoService.cadastrar(req.body);
        return res.status(201).json(cadastrado);
    }

    async listar(req, res) {
        const listados = await EnderecoService.listar(req.body);
        return res.status(200).json(listados)

    }

    async listarId(req, res) {
        const {id} = req.params;
        const listado = await EnderecoService.listarId(id);
        return res.status(200).json(listado);
    }

    async atualizar(req, res) {

    }

    async remover(req, res) {

    }

}

export default new EnderecoController();