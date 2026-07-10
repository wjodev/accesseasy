import userService from "../services/user.service.js";

class UserController {

        async cadastrar(req, res) {

            console.log("controler req", req.body);
        
            const usuario = await userService.cadastrar(req.body);
            return res.status(201).json(usuario);
            
        }
}

export default new UserController();