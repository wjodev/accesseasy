import userService from "../services/user.service.js";

class UserController {

        async cadastrar(req, res) {

            console.log("controler req", req.body);
        
            const usuario = await userService.cadastrar(req.body);
            return res.status(201).json(usuario);
            
        }

        async buscarUsuario(req, res) {

            console.log("controller buscar req", req.body);
            const consulta = await userService.buscarUsuario(req.body);

            return res.status(201).json(consulta);
            
        }
}

export default new UserController();