import userService from "../services/user.service.js";

class UserController {

        async cadastrar(req, res) {
            const usuario = await userService.cadastrar(req.body);
            return res.status(201).json(usuario);
        }

        async listar(req, res) {
            const usuarios = await userService.listar();
            return res.status(200).json(usuarios);
        }

        async buscarUsuario(req, res) {

            const { cpf } = req.params;
            const consulta = await userService.buscarUsuario(cpf);
            return res.status(200).json(consulta);
        }

        async atualizar(req, res){
            const usuario = req.body;
            const {id} = req.params;
            const atualizado = await userService.atualizar(usuario, id);
            return res.status(200).json(atualizado);
            
        }

        async remover (req, res){
            const {id} = req.params;
            const removido = await userService.remover(id);
            return res.status(200).json(removido);
        }
}

export default new UserController();