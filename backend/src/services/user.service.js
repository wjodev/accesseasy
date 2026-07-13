import userRepository from "../repositories/user.repository.js";

class userService {

    async cadastrar(usuario) {
        console.log ("usuario no serviço", usuario);
        return await userRepository.cadastrar(usuario);

    }

    async buscarUsuario(consulta) {
        console.log ("usuario no serviço", consulta);
        return await userRepository.buscarUsuario(consulta);
    }
}

export default new userService();