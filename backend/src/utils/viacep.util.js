class ViaCepUtil {

    async buscarCEP(cep) {

        const cepLimpo = cep.replace(/\D/g, "");

        if (cepLimpo.length !== 8) {
            throw new Error("CEP inválido.");
        }

        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);

        if (!response.ok) {
            throw new Error("Erro ao consultar o ViaCEP.");
        }

        const endereco = await response.json();

        if (endereco.erro) {
            throw new Error("CEP não encontrado.");
        }

        return endereco;
    }

}

export default new ViaCepUtil();