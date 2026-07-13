import userService from "../services/user.service.js";

class UserController {

        async cadastrar(req, res) {

            console.log("controler req", req.body);
        
            const usuario = await userService.cadastrar(req.body);
            return res.status(201).json(usuario);
            
        }

        async buscarUsuario(req, res) {

            const { cpf } = req.params;

            console.log("controller buscar req",cpf);
            const consulta = await userService.buscarUsuario(cpf);

            return res.status(201).json(consulta);
            
        }
}

export default new UserController();