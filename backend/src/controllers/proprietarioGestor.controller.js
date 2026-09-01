import ProprietarioGestorService
    from "../services/proprietarioGestor.service.js";

class ProprietarioGestorController {

    async cadastrar(req, res) {
        const { usuario_id } = req.body;

        const proprietario =
            await ProprietarioGestorService.cadastrar(usuario_id);

        return res.status(201).json(proprietario);
    }

    async listar(req, res) {
        const proprietarios =
            await ProprietarioGestorService.listar();

        return res.status(200).json(proprietarios);
    }

    async buscarId(req, res) {
        const { id } = req.params;

        const proprietario =
            await ProprietarioGestorService.buscarId(id);

        return res.status(200).json(proprietario);
    }

    async remover(req, res) {
        const { id } = req.params;

        const removido =
            await ProprietarioGestorService.remover(id);

        return res.status(200).json(removido);
    }
}

export default new ProprietarioGestorController();