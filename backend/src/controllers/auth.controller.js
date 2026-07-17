import AuthService from "../services/auth.service.js";

class AuthController{

    async autenticar(req, res){
        const credenciais = await AuthService.autenticar(req.body);
        return res.status(200).json(credenciais);
    }

}export default new AuthController();