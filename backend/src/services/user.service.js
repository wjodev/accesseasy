import userRepository from "../repositories/user.repository.js";
import cpfUtil from "../utils/cpf.util.js";

class userService {

    async cadastrar(usuario) {

        
        const {nome, cpf, email, senha, telefone} = usuario
    //---------------------campos preenchidos-------------------
        if(!nome || !cpf || !email || !senha || !telefone) {
            throw new Error("Preencha todos os campos");
        }
    //---------------------valida cpf------------------- 
        const cpflimpo = cpf.replace(/\D/g, "");
        usuario.cpf = cpflimpo;

        const verificaCad = await userRepository.buscarUsuario(cpflimpo);
        if (verificaCad) {
            throw new Error("CPF já cadastrado.");
        }

        if(!cpfUtil.validar(cpflimpo)){
            throw new Error ("CPF invalido");
        }
    //------------------------valida email-------------------

        return await userRepository.cadastrar(usuario);
    }

    async listar() {
        return await userRepository.listar();
    }

    async buscarUsuario(cpf) {
        return await userRepository.buscarUsuario(cpf);
    }

    async atualizar(usuario, id) {
        return await userRepository.atualizar(usuario, id);
    }

    async remover(id){
        return await userRepository.remover(id);
        
    }
}

export default new userService();