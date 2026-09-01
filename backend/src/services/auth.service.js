import userRepository from "../repositories/user.repository.js";
import emailUtil from "../utils/email.util.js";
import jwtUtil from "../utils/jwt.util.js";
import bcrypt from "bcrypt";

class AuthService{

    async autenticar(credenciais){

        const {email, senha} = credenciais;

        //---------------------campos preenchidos-------------------
        if(!email || !senha) {
            throw new Error("Preencha todos os campos");
        }

        //-------------------Verifica email -----------------------
        const emailLimpo = email.trim().toLowerCase();

        credenciais.email = emailLimpo;
        
        if (!emailUtil.validar(emailLimpo)){
            throw new Error("E-mail ou senha incorretos.")
        }
        //---------------------busca o usuario-----------------------
        const usuario = await userRepository.autenticar(emailLimpo);
        if (!usuario){
            throw new Error("E-mail ou senha incorretos.")
        }

        //-------------------compara senhas--------------------------
        const senhaCorreta = await bcrypt.compare(
            senha,
            usuario.senha
        );
        
        if(!senhaCorreta){
            throw new Error("E-mail ou senha incorretos.")
        }

        //---------------------gera jwt----------------------------------
        
        const usuarioRetornado = {
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            tipo_usuario_id: usuario.tipo_usuario_id,
            tipo_usuario: usuario.tipo_usuario
        };

        const token = await jwtUtil.gerarToken(usuarioRetornado);
        
        const  usuarioToken = {usuario: usuarioRetornado, token: token};

        return (usuarioToken);
    }
}export default new AuthService();
