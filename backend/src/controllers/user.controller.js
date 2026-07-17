import UserService from "../services/user.service.js";

class UserController {

        async cadastrar(req, res) {
            const usuario = await UserService.cadastrar(req.body);
            return res.status(201).json(usuario);
        }

        async listar(req, res) {
            const usuarios = await UserService.listar();
            return res.status(200).json(usuarios);
        }

        async buscarCPF(req, res) {

            const { cpf } = req.params;
            const consulta = await UserService.buscarCPF(cpf);
            return res.status(200).json(consulta);
        }

        async atualizar(req, res){
            const usuario = req.body;
            const {id} = req.params;
            const atualizado = await UserService.atualizar(usuario, id);
            return res.status(200).json(atualizado);
            
        }

        async remover (req, res){
            const {id} = req.params;
            const removido = await UserService.remover(id);
            return res.status(200).json(removido);
        }
}

export default new UserController();