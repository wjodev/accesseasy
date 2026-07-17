import userRepository from "../repositories/user.repository.js";
import cpfUtil from "../utils/cpf.util.js";
import emailUtil from "../utils/email.util.js";
import bcrypt from "bcrypt";

class UserService {

    async cadastrar(usuario) {

        
        const {nome, cpf, email, senha, telefone} = usuario
    //---------------------campos preenchidos-------------------
        if(!nome || !cpf || !email || !senha || !telefone) {
            throw new Error("Preencha todos os campos");
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
        
        console.log(senha);
    //------------------------ sem erros de validação ----------

        return await userRepository.cadastrar(usuario);
    }

    async listar() {
        return await userRepository.listar();
    }

    async buscarCPF(cpf) {
        return await userRepository.buscarCPF(cpf);
    }

    async atualizar(usuario, id) {

        const {email, senha, telefone} = usuario
    //---------------------campos preenchidos-------------------
        if(!email || !senha || !telefone) {
            throw new Error("Preencha todos os campos");
        }
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
        
        console.log(usuario.senha);
        return await userRepository.atualizar(usuario, id);
    //------------------------ sem erros de validação ---------- 
      
       
    }

    async remover(id){
        return await userRepository.remover(id);
        
    }
}

export default new UserService();