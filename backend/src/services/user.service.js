import userRepository from "../repositories/user.repository.js";

class userService {

    async cadastrar(usuario) {
        console.log ("usuario no serviço", usuario);
        return await userRepository.cadastrar(usuario);

    }
}

export default new userService();