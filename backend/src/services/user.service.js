import userRepository from "../repositories/user.repository.js";

class userService {

    async cadastrar(usuario) {
        console.log ("usuario no serviço", usuario);
        return await userRepository.cadastrar(usuario);

    }

    async buscarUsuario(cpf) {
        console.log ("usuario no serviço", cpf);
        return await userRepository.buscarUsuario(cpf);
    }
}

export default new userService();