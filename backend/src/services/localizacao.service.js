import LocalizacaoRepository from "../repositories/localizacao.repository.js";
import ViaCepUtil from "../utils/viacep.util.js";


class LocalizacaoService{

    async cadastrar(localizacao){
       const {cep, numero, complemento} = localizacao;

       if (!cep) {
        throw new Error("CEP é obrigatório.");
        }
        
        if (!numero) {
            throw new Error("Número é obrigatório.");
        }
       

       const consultaLocalizacao = await ViaCepUtil.buscarCEP(cep);

       const localizacaoBanco ={
        cep: consultaLocalizacao.cep,
        estado: consultaLocalizacao.uf,
        cidade: consultaLocalizacao.localidade,
        bairro: consultaLocalizacao.bairro,
        rua: consultaLocalizacao.logradouro,
        numero: numero, 
        complemento: complemento,
        latitude: null,
        longitude: null
       };

       const cadastrado = await LocalizacaoRepository.cadastrar(localizacaoBanco);

       if(!cadastrado){
        throw new Error ("Erro ao cadastrar localização");
       }
       return cadastrado;
    }
    
    async listar(){
        return await LocalizacaoRepository.listar();     
    }

    async listarId(id){ 
        
            if (!id) {
                throw new Error("ID do localização é obrigatório.");
            }
        
            const localizacao = await LocalizacaoRepository.listarId(id);
        
            if (!localizacao) {
                throw new Error("Localização não encontrado.");
            }
        
            return localizacao;
    }
    
    async atualizar(id, localizacao){

        const { cep, numero, complemento } = localizacao;

        if (!id) {
            throw new Error("ID do localização é obrigatório.");
        }

        if (!cep) {
            throw new Error("CEP é obrigatório.");
        }

        if (!numero) {
            throw new Error("Número é obrigatório.");
        }

        const localizacaoConsulta = await this.listarId(id);

        if (!localizacaoConsulta) {
            throw new Error("Localização não encontrado.");
        }

        const consultaLocalizacao = await ViaCepUtil.buscarCEP(cep);

        const localizacaoBanco = {
            cep: consultaLocalizacao.cep,
            estado: consultaLocalizacao.uf,
            cidade: consultaLocalizacao.localidade,
            bairro: consultaLocalizacao.bairro,
            rua: consultaLocalizacao.logradouro,
            numero: numero,
            complemento: complemento,
            latitude: localizacaoConsulta.latitude,
            longitude: localizacaoConsulta.longitude
        };

        const atualizado = await LocalizacaoRepository.atualizar(id, localizacaoBanco);

        return atualizado;

    }

    async remover(id){

        if (!id) {
            throw new Error("ID do localização é obrigatório.");
        }

        const localizacaoConsulta = await this.listarId(id);

        if (!localizacaoConsulta) {
            throw new Error("Localização não encontrado.");
        }

        const removido = await LocalizacaoRepository.remover(id);

        return removido;
    }

    


}export default new LocalizacaoService();