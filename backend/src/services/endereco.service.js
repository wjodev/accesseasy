import EnderecoRepository from "../repositories/endereco.repository.js";
import ViaCepUtil from "../utils/viacep.util.js";


class EnderecoService{

    async cadastrar(endereco){
       const {cep, numero, complemento} = endereco;

       if (!cep) {
        throw new Error("CEP é obrigatório.");
        }
        
        if (!numero) {
            throw new Error("Número é obrigatório.");
        }
       

       const consultaEndereco = await ViaCepUtil.buscarCEP(cep);

       const enderecoBanco ={
        cep: consultaEndereco.cep,
        estado: consultaEndereco.uf,
        cidade: consultaEndereco.localidade,
        bairro: consultaEndereco.bairro,
        rua: consultaEndereco.logradouro,
        numero: numero, 
        complemento: complemento,
        latitude: null,
        longitude: null
       };

       const cadastrado = await EnderecoRepository.cadastrar(enderecoBanco);

       if(!cadastrado){
        throw new Error ("Erro ao cadastrar endereço");
       }
       return cadastrado;
    }
    
    async listar(){
        return await EnderecoRepository.listar();     
    }

    async listarId(id){ 
        
            if (!id) {
                throw new Error("ID do endereço é obrigatório.");
            }
        
            const endereco = await EnderecoRepository.listarId(id);
        
            if (!endereco) {
                throw new Error("Endereço não encontrado.");
            }
        
            return endereco;
    }
    
    async atualizar(id, endereco){

        const { cep, numero, complemento } = endereco;

        if (!id) {
            throw new Error("ID do endereço é obrigatório.");
        }

        if (!cep) {
            throw new Error("CEP é obrigatório.");
        }

        if (!numero) {
            throw new Error("Número é obrigatório.");
        }

        const enderecoConsulta = await this.listarId(id);

        if (!enderecoConsulta) {
            throw new Error("Endereço não encontrado.");
        }

        const consultaEndereco = await ViaCepUtil.buscarCEP(cep);

        const enderecoBanco = {
            cep: consultaEndereco.cep,
            estado: consultaEndereco.uf,
            cidade: consultaEndereco.localidade,
            bairro: consultaEndereco.bairro,
            rua: consultaEndereco.logradouro,
            numero: numero,
            complemento: complemento,
            latitude: enderecoConsulta.latitude,
            longitude: enderecoConsulta.longitude
        };

        const atualizado = await EnderecoRepository.atualizar(id, enderecoBanco);

        return atualizado;

    }

    async remover(id){

        if (!id) {
            throw new Error("ID do endereço é obrigatório.");
        }

        const enderecoConsulta = await this.listarId(id);

        if (!enderecoConsulta) {
            throw new Error("Endereço não encontrado.");
        }

        const removido = await EnderecoRepository.remover(id);

        return removido;
    }

    


}export default new EnderecoService();