import userRepository from "../repositories/user.repository.js";
import emailUtil from "../utils/email.util.js";
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
        
        const usuarioRetornado = {id: usuario.id, nome: usuario.nome, email: usuario.email};

        return(usuarioRetornado)

    }
}export default new AuthService();
