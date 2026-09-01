import userRepository from "../repositories/user.repository.js";
import LocalizacaoRepository from "../repositories/localizacao.repository.js";
import cpfUtil from "../utils/cpf.util.js";
import emailUtil from "../utils/email.util.js";
import bcrypt from "bcrypt";

class UserService {

    async cadastrar(usuario) {

        
        const {nome, cpf, email, senha, telefone, localizacao_id, tipo_usuario_id} = usuario
    //---------------------campos preenchidos-------------------
        if(!nome || !cpf || !email || !senha || !telefone || !tipo_usuario_id) {
            throw new Error("Preencha todos os campos");
        }
        //---------------------valida tipo usuario-------------------
        const verificaTipo = await userRepository.buscarTipoUsuario(tipo_usuario_id);

        if (!verificaTipo) {
            throw new Error("Tipo de usuário não encontrado.");
        }

        //---------------------valida localizacao-----------------------
        if (localizacao_id) {

            const verificaLocalizacao = await LocalizacaoRepository.listarId(localizacao_id);

            if (!verificaLocalizacao) {
                throw new Error("Localização não encontrado.");
            }
        }
    //---------------------valida cpf------------------- 
        const cpflimpo = cpf.replace(/\D/g, "");
        usuario.cpf = cpflimpo;


        if(!cpfUtil.validar(cpflimpo)){
            throw new Error ("CPF invalido");
        }

        const verificaCPF = await userRepository.buscarCPF(cpflimpo);
        if (verificaCPF) {
            throw new Error("CPF já cadastrado.");
        }
    //------------------------valida email-------------------
        const emailLimpo = email.trim().toLowerCase();

        usuario.email = emailLimpo;
        
        if (!emailUtil.validar(emailLimpo)){
            throw new Error("E-mail inválido.")
        }

        const verificaEmail = await userRepository.buscarEmail(emailLimpo);
        if (verificaEmail){
            throw new Error("E-mail cadastrado")
        }
    //-----------------------criptografa a senha ---------------
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        usuario.senha = senhaCriptografada;

    //------------------------localização opcional------------------
        usuario.localizacao_id = localizacao_id || null;
    //------------------------ sem erros de validação ----------

        return await userRepository.cadastrar(usuario);
    }

    async listar() {
        return await userRepository.listar();
    }

    async buscarId(id) {

        const usuario = await userRepository.buscarId(id);
    
        if (!usuario) {
            throw new Error("Usuário não encontrado.");
        }
    
        return usuario;
    }
    
    async buscarCPF(cpf) {
        return await userRepository.buscarCPF(cpf);
    }

    async atualizar(usuario, id) {

        const {email, senha, telefone, localizacao_id} = usuario

    //---------------------verifica usuario----------------------
        const usuarioAtual = await userRepository.buscarId(id);

        if(!usuarioAtual){
            throw new Error("Usuário não encontrado.");
        }

    //---------------------campos preenchidos-------------------
        if(!email || !senha || !telefone) {
            throw new Error("Preencha todos os campos");
        }
    //---------------------valida localizacao-----------------------
    if(localizacao_id){

        const verificaLocalizacao = await LocalizacaoRepository.listarId(localizacao_id);

        if(!verificaLocalizacao){
            throw new Error("Localização não encontrado.");
        }
    }

    //---------------------mantem localizacao atual-----------------
    usuario.localizacao_id = localizacao_id || usuarioAtual.localizacao_id;

    //------------------------valida email-------------------
        const emailLimpo = email.trim().toLowerCase();

        usuario.email = emailLimpo;
        
        if (!emailUtil.validar(emailLimpo)){
            throw new Error("E-mail inválido.")
        }

        const verificaEmail = await userRepository.buscarEmail(emailLimpo);

        if (verificaEmail && verificaEmail.id != id){
            throw new Error("E-mail cadastrado")
        }
    //-----------------------criptografa a senha ---------------
        const senhaCriptografada = await bcrypt.hash(senha, 10);

        usuario.senha = senhaCriptografada;

    //------------------------ sem erros de validação ---------- 

        return await userRepository.atualizar(usuario, id);
   
    }

    async atualizarTipoUsuario(id, tipo_usuario_id) {

        if (!tipo_usuario_id) {
            throw new Error("Tipo de usuário é obrigatório.");
        }

        const verificaTipo = await userRepository.buscarTipoUsuario(tipo_usuario_id);

        if (!verificaTipo) {
            throw new Error("Tipo de usuário não encontrado.");
        }

        const atualizado = await userRepository.atualizarTipoUsuario(
            id,
            tipo_usuario_id
        );

        if (!atualizado) {
            throw new Error("Usuário não encontrado.");
        }

        return atualizado;
    }

    async remover(id){

        const usuario = await userRepository.buscarId(id);

        if(!usuario){
            throw new Error("Usuário não encontrado.");
        }

        return await userRepository.remover(id);
        
    }
}

export default new UserService();