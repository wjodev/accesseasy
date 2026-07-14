import userRepository from "../repositories/user.repository.js";

class userService {

    async cadastrar(usuario) {
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