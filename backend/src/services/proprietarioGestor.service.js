import ProprietarioGestorRepository
    from "../repositories/proprietarioGestor.repository.js";

import userRepository
    from "../repositories/user.repository.js";

class ProprietarioGestorService {

    async cadastrar(usuario_id) {

        if (!usuario_id) {
            throw new Error("Usuário é obrigatório.");
        }

        const usuario = await userRepository.buscarId(usuario_id);

        if (!usuario) {
            throw new Error("Usuário não encontrado.");
        }

        if (usuario.tipo_usuario_id !== 2) {
            throw new Error(
                "O usuário precisa ser do tipo Proprietário/Gestor."
            );
        }

        const existente =
            await ProprietarioGestorRepository.buscarUsuarioId(usuario_id);

        if (existente) {
            throw new Error(
                "Usuário já cadastrado como Proprietário/Gestor."
            );
        }

        return await ProprietarioGestorRepository.cadastrar(usuario_id);
    }

    async listar() {
        return await ProprietarioGestorRepository.listar();
    }

    async buscarId(id) {
        const proprietario =
            await ProprietarioGestorRepository.buscarId(id);

        if (!proprietario) {
            throw new Error("Proprietário/Gestor não encontrado.");
        }

        return proprietario;
    }

    async remover(id) {

        const proprietario =
            await ProprietarioGestorRepository.buscarId(id);

        if (!proprietario) {
            throw new Error("Proprietário/Gestor não encontrado.");
        }

        return await ProprietarioGestorRepository.remover(id);
    }
}

export default new ProprietarioGestorService();